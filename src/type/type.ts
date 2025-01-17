export type excelType = {
  index: number;
  date: number;
  상품번호: number;
  링크: string;
  브랜드: string;
  카테고리: string;
  "상품명(추정)": string;
  "모델명(추정)": string;
  색상: string;
  성별: string;
  비고: string;
  담당자: string;
};

export type whiteListType = {
  URL: string;
};

export type testAPIType = {
  brand: string;
  name: string;
  modelName: string;
};

export type imagUrlType = { url: string | null };

export type searchImageObject = {
  isCrawlinImageUrlHide?: boolean;
  searchlinks: string;
  imageUrls: imagUrlType[];
};

export type selectImageTableType = {
  index: number;
  productImageUrl: string[];
  productInfo: { brand: string; name: string; modalName: string };
  originalLink: string;
  crawlingImageUrl: searchImageObject[];
  selectedImages: string[];
  blackListImages: string[];
};

export interface CustomHTMLElement extends HTMLElement {
  naturalWidth?: number;
}
export type exportExcelData = {
  index: number;
  브랜드: string;
  상품명: string;
  모델명: string;
  ["상품상세 이미지 1"]: string;
  ["상품상세 이미지 2"]: string;
  ["상품상세 이미지 3"]: string;
  ["상품상세 이미지 4"]: string;
  ["상품상세 이미지 5"]: string;
  ["상품상세 이미지 6"]: string;
};

export type crawlingDataType = { author: string; list: excelType[] };
export type targetSiteType = "okmall" | "musinsa" | "premiummultishop";
