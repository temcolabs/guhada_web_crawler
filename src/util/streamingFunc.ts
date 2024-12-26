import { Page } from "@playwright/test";
import { excelType, selectImageTableType } from "type/type";
import { getOkmallImage, getSearchImagesUrl } from "./crawling";

const getOneByOneCrawlingData = async (
  data: excelType,
  page: Page,
  target: "okmall" = "okmall",
  whiteListBrand: string[],
) => {
  let selector = "";

  // 엑셀에있는 브랜드 명으로 화이트 리스트를 만든다.(공백제거한))

  if (target === "okmall") {
    selector = "#thumbSmallView > li > a > img";
  }

  const getOkmallImges = await getOkmallImage(page, data, selector);

  // ok 몰 상품품 비교 이미지 긁어오기
  const getSearchImages = await getSearchImagesUrl(data, page, whiteListBrand);

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

  return pushData;
};

export { getOneByOneCrawlingData };
