/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { chromium, Page } from "playwright";
import { excelType, selectImageTableType } from "type/type";
import { getOkmallImage, getSearchImagesUrl } from "util/crawling";
import { parsingExcelToJSON } from "util/ExcelToJson";
import { fileGenerator } from "util/utils";

const crawlingStart = async (
  jsonData: excelType[],
  page: Page,
  imagesTarget: "okmall" | null | FormDataEntryValue = "okmall",
) => {
  const parsingData: selectImageTableType[] = [];
  let selector = "";

  // 엑셀에있는 브랜드 명으로 화이트 리스트를 만든다.(공백제거한))
  const whiteListBrand = jsonData.map((item) =>
    item.브랜드.replace(/\s+/g, "").toLowerCase(),
  );
  if (imagesTarget === "okmall") {
    selector = "#thumbSmallView > li > a > img";
  }

  for (const data of jsonData) {
    // ok몰 상품 이미지 긁어오기
    const getOkmallImges = await getOkmallImage(page, data, selector);

    // ok 몰 상품품 비교 이미지 긁어오기
    const getSearchImages = await getSearchImagesUrl(
      data,
      page,
      whiteListBrand,
    );

    const pushData: selectImageTableType = {
      originalLink: data.링크,
      index: data.index,
      productImageUrl: getOkmallImges,
      productInfo: {
        brand: data.브랜드,
        name: data["상품명(추정)"],
        modalName: data["모델명(추정)"],
      },
      crawlingImageUrl: getSearchImages,
      selectedImageLength: 0,
      searchImpossible: false,
      manualUrl: [],
    };

    parsingData.push(pushData);

    // fileGenerator("output.json", pushData);
  }

  return parsingData;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData(); // Extract formData from request
  const target = data.get("target");
  const file = data.get("file") as File;
  const isChromium = data.get("isChromium") === "true";

  const jsonData = await parsingExcelToJSON<excelType>(file);

  const browser = await chromium.launch({
    headless: isChromium ? false : true,
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    locale: "en-US",
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  await context.clearCookies();
  const page = await context.newPage();

  await page.setViewportSize({ width: 2000, height: 1000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  try {
    const getData = await crawlingStart(jsonData, page, target);

    return NextResponse.json({
      message: "File processed successfully",
      data: getData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to process file", error },
      { status: 500 },
    );
  } finally {
    browser.close();
  }
}
