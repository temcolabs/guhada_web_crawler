import { Page } from "@playwright/test";
import { excelType, selectImageTableType, targetSiteType } from "type/type";
import { getSearchImagesUrl, getTargetImages } from "./crawling";

const getOneByOneCrawlingData = async (
  data: excelType,
  page: Page,
  target: targetSiteType = "okmall",
  whiteListBrand: string[],
) => {
  const targetImages = await getTargetImages(page, data, target);

  //상품품 비교 이미지 긁어오기
  const getSearchImages = await getSearchImagesUrl(data, page, whiteListBrand);

  const pushData: selectImageTableType = {
    originalLink: data.링크,
    index: data.index,
    productImageUrl: targetImages,
    productInfo: {
      brand: data.브랜드,
      name: data["상품명(추정)"],
      modalName: data["모델명(추정)"],
    },
    crawlingImageUrl: getSearchImages,
    selectedImages: [],
    blackListImages: [],
  };

  return pushData;
};

export { getOneByOneCrawlingData };
