/* eslint-disable @typescript-eslint/no-unused-vars */
import { chromium } from "@playwright/test";

import imageBlackList from "hostNameList/imageBlackList";
import { NextRequest, NextResponse } from "next/server";
import { Page } from "playwright";
import { imagUrlType, whiteListType } from "type/type";
import { parsingExcelToJSON } from "./ExcelToJson";
import { crawlingDataToFile, fileGenerator } from "./utils";

//캡차박스 컨트롤
const testssss = async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ javaScriptEnabled: true });
  const page = await context.newPage();
  const images: string[] = [];
  try {
    await page.goto(
      "https://www.google.com/sorry/index?continue=https://www.google.co.kr/search%3Fq%3DXFPPU8653-01%2520site:giraffehousevn.com%2520OR%2520site:lacoste.pl%2520OR%2520site:lacoste.com%2520OR%2520site:jlindebergusa.com%2520OR%2520site:mammut.com%2520OR%2520site:woolpower.se%2520OR%2520site:baracuta.com%2520OR%2520site:poizon.com%2520OR%2520site:buyma.com%2520OR%2520site:h-brands.com%2520OR%2520site:genteroma.com%2520OR%2520site:thebs.com%2520OR%2520site:goat.com%2520OR%2520site:samuraysport.com%2520OR%2520site:modesens.com%2520OR%2520site:carlsgolfland.com%2520OR%2520site:llaud.nl%2520OR%2520site:animasportiva.com%2520OR%2520site:cettire.com%2520OR%2520site:shooos.com%2520OR%2520site:bivouacannarbor.com%2520OR%2520site:osprey.com%2520OR%2520site:blackdiamondequipment.co.kr%2520OR%2520site:pod7kilo.cz%2520OR%2520site:en.aventurenordique.com%2520OR%2520site:suitableshop.com%2520OR%2520site:sporttechstore.com%2520OR%2520site:golfio.com%2520OR%2520site:24s.com%2520OR%2520site:worldwidegolfshops.com%2520OR%2520site:golfposer.com%2520OR%2520site:function18.com%2520OR%2520site:amazon.com%2520OR%2520site:opticsplanet.com%2520OR%2520site:campsaver.com%2520OR%2520site:golflocker.com%2520OR%2520site:kickscrew.com%2520OR%2520site:pod7kilo.cz%2520OR%2520site:en.aventurenordique.com%2520OR%2520site:suitableshop.com%2520OR%2520site:sporttechstore.com%2520OR%2520site:golfio.com%2520OR%2520site:24s.com%2520OR%2520site:worldwidegolfshops.com%2520OR%2520site:golfposer.com%2520OR%2520site:function18.com%2520OR%2520site:amazon.com%2520OR%2520site:opticsplanet.com%2520OR%2520site:campsaver.com%2520OR%2520site:golflocker.com%2520OR%2520site:kickscrew.com%2520OR%2520site:globalgolf.com%2520OR%2520site:www.acnestudios.com/us/en%2520OR%2520site:www.poizon.com/%2520OR%2520site:balaan.com/%2520OR%2520%2520%26sca_esv%3D48a32a8a53a0fe13%26sxsrf%3DADLYWILkWAJ5zBsSlhWU0QraCMcHiSIGAQ:1734491139020%26lr%3Dlang_en%26sa%3DX%26ved%3D2ahUKEwjI_tOBq7CKAxWXk68BHU36BFAQuAF6BAgJEAE%26biw%3D1297%26bih%3D934%26dpr%3D1&q=EgR5pj4yGIS9j7sGIjCKSK4fhxZBo6lEVXYdA6CuPVNtJoEpLbVLGRmf-ysSvT1x4A-lit3zzPWxRE7hENoyAXJaAUM",
    );

    // await page?.waitForSelector("img");
    // const imageUrl = await page?.locator("img")?.evaluateAll((elements) => {
    //   const imageList: { width: number; imageSrc: string | null }[] = [];
    //   elements?.forEach((img: any) => {
    //     if (img instanceof HTMLElement) {
    //       const customImage: CustomHTMLElement = img;
    //       if (customImage?.naturalWidth && customImage?.naturalWidth >= 450) {
    //         imageList.push({
    //           width: customImage.naturalWidth,
    //           imageSrc: img.getAttribute("src"),
    //         });
    //       }
    //     }
    //   });
    //   return imageList;
    // });
    await page
      .waitForSelector("#recaptcha-anchor > div.recaptcha-checkbox-border")
      .then(() => {});

    const getTimer = setInterval(async () => {
      if (
        await page
          .locator("#recaptcha-anchor > div.recaptcha-checkbox-border")
          .isVisible()
      ) {
        await page
          .locator("#recaptcha-anchor > div.recaptcha-checkbox-border")
          .click();
        clearInterval(getTimer);
      } else {
      }
    }, 1000);
    return NextResponse.json(
      { message: "success", data: images },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "fail", error }, { status: 500 });
  } finally {
    // browser.close();
  }
};

export const whiteListParsing = async (req: NextRequest) => {
  const data = await req.formData(); // Extract formData from request

  const file = data.get("file") as File;

  try {
    const jsonData = await parsingExcelToJSON<whiteListType>(file);

    const filterArray: string[] = [];
    const whiteListData: string[] = [];
    jsonData.forEach((item) => {
      const url = new URL(item.URL);
      // console.log(url.hostname);
      if (url.hostname.includes("img")) {
        filterArray.push(url.href);
      } else if (url.hostname.includes(".cloudfront")) {
        filterArray.push(url.href);
      } else {
        whiteListData.push(
          url.hostname
            .replace("assets.", "")
            .replace("cdn-images.", "")
            .replace("cdn.shoplightspeed.com", "")
            .replace("images.", "")
            .replace("cafe24.poxo.com", "")
            .replace("cs1.0ps.us", "")
            .replace("cdn.webshopapp.com", "")
            .replace("egress.storeden.net", "")
            .replace("image.goat.com", "")
            .replace("twicpics.celine.com", "")
            .replace("-contents.com", "")
            .replace("m.media-", "")
            .replace("static.flexdog.com", "")
            .replace("admin.kaufmannstatic.com", "www.kaufmann-store.com")
            .replace("static.wixstatic.com", "")
            .replace("cms.brnstc.de", "")
            .replace("assets2.", "")
            .replace("asset.", "")
            .replace("image-raw.", "")
            .replace("dms.deckers.com", "")
            .replace("media-catalog.", "")
            .replace("media.", ""),
        );
      }
    });

    // fileGenerator("getWhiteList.json", [...new Set(whiteListData)]);
    // fileGenerator("fillterArray.json", [...new Set(filterArray)]);
    // fileGenerator("newWhiteList.json", [...new Set(whiteList)]);
    return NextResponse.json(
      { message: "success", data: whiteListData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "fail", error }, { status: 500 });
  }
};

export const getOnPage = async (url: string, page: Page) => {
  const image: string[] = [];
  try {
    await page?.goto(url, { waitUntil: "domcontentloaded" });

    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(2000);
    await page.waitForSelector(".lazyloading");
    const srcList = await page.$$eval(
      ".lazyloading",
      (elements) =>
        elements
          .map((element) => element.getAttribute("src")) // 각 엘리먼트의 src 추출
          .filter((src) => src !== null), // null인 src 제거
    );

    console.log(srcList);
    return srcList;
  } catch (error) {
    console.log("에러남?", error);
    return image;
  } finally {
    await page.close();
  }
};

export { testssss };
