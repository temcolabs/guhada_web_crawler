/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page } from "@playwright/test";
import imageBlackList from "hostNameList/imageBlackList";
import whiteUrlList from "hostNameList/whiteUrlList";
import {
  excelType,
  imagUrlType,
  searchImageObject,
  targetSiteType,
} from "type/type";
import { random } from "./utils";

const getTargetImages = async (
  page: Page,
  data: excelType,
  target: targetSiteType,
) => {
  try {
    const imgSrcList: string[] = [];
    if (target === "okmall") {
      await page.goto(data["링크"], {
        waitUntil: "domcontentloaded",
        timeout: 6000,
      });
      const getThumbnail = page.locator("#thumbSmallView > li > a > img");
      const count = await getThumbnail.count();
      for (let i = 0; i < count; i++) {
        const imgSrc = await getThumbnail.nth(i).getAttribute("src");
        if (imgSrc) {
          imgSrcList.push(`https:${imgSrc}`);
        }
      }
    }
    if (target === "musinsa") {
      await page.route("**/*", (route) => {
        const url = route.request().url();

        if (
          url.includes("analytics") ||
          url.includes("google-analytics") ||
          url.includes("ads") ||
          url.includes(".woff2") ||
          url.includes("googletagmanager") ||
          url.includes("clarity")
        ) {
          route.abort();
        } else {
          route.continue();
        }
      });
      page.on("response", async (response) => {
        const responseUrl = response.url();
        if (
          (responseUrl.includes(".jpg") || responseUrl.includes(".jpeg")) &&
          (responseUrl.includes("image.msscdn.net/images/prd_img") ||
            responseUrl.includes(
              "image.msscdn.net/thumbnails/images/goods_img",
            ) ||
            responseUrl.includes(
              "image.msscdn.net/thumbnails/images/prd_img",
            ) ||
            responseUrl.includes("image.musinsa.com/images/prd_img")) &&
          !responseUrl.includes("cdn-images.buyma.com")
        ) {
          const isBlackList = imageBlackList.some((item) =>
            responseUrl.includes(item),
          );

          if (!isBlackList && !responseUrl.includes("w=390")) {
            imgSrcList.push(responseUrl);
          }
        }
      });

      await page?.goto(data.링크, {
        waitUntil: "networkidle",
        timeout: 7000,
      });
      await page.waitForTimeout(5000);
    }
    if (target === "premiummultishop") {
      page.on("response", async (response) => {
        const responseUrl = response.url();
        if (
          responseUrl.endsWith(".jpg") &&
          responseUrl.includes("https://blue3200.openhost.cafe24.com/") &&
          !imageBlackList.includes(responseUrl)
        ) {
          imgSrcList.push(responseUrl);
        }
      });
      await page?.goto(data.링크, {
        waitUntil: "networkidle",
        timeout: 3000,
      });
      await page.waitForTimeout(3000);
    }

    return imgSrcList;
  } catch (error) {
    return [];
  }
};

const searchAndGrapHrefs = async (
  searchWord: string,
  target: "img" | "search" = "search",
  page: Page,
  whiteListBrand: string[],
) => {
  if (target === "search") {
    try {
      const searchUrl = `https://www.google.co.kr/search?q=${searchWord}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIKP6wBfj2ZcPKNujDXmeaWICOpKIg:1735540086660&lr=lang_en&sa=X&ved=2ahUKEwjnlO_S7s6KAxV1UfUHHbkoOHcQuAF6BAgNEAE&biw=1918&bih=931`;

      await page.goto(searchUrl);
      await page.waitForTimeout(random(3000));

      // 결색결과 의 모든 href가져오기
      const isCapChaPage = page.url().includes("sorry");
      if (!isCapChaPage) {
        const finalFilterImagesHost: string[] = [];
        const getLinks = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("a"))
            .filter((anchor) => !anchor.href.includes("google"))
            .filter((item) => item.href !== "")
            .map((item) => item.href);
        });

        for (const item of getLinks) {
          try {
            const url = new URL(item);

            const setWhiteList = new Set(whiteListBrand.concat(whiteUrlList));

            const includeWhiteList = Array.from(setWhiteList).some((item) => {
              return url.hostname.includes(item);
            });
            if (includeWhiteList) {
              finalFilterImagesHost.push(item);
            }
          } catch (error) {}
        }

        return finalFilterImagesHost;
      } else {
        console.log("퓨즈걸림?");
        await page.pause();
        console.log("퓨즈끝");
        return await searchAndGrapHrefs(
          searchWord,
          target,
          page,
          whiteListBrand,
        );
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    try {
      // const searchImageUrl = `https://www.google.co.kr/search?lr=lang_en&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJdMBGnhnRvYgS1nDooqVjX8ccGpw:1734491150904&q=${searchWord} ${filterSearchWord}&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWxyMMuf0D-HOMEpzq2zertRy7G-dme1ONMLTCBvZzSlhO4TKEdryJiDx5bWrq9blHq2bVKEdiUdHFMAS0aV1fP80s5bIT2vgAzFSu9ANBsRNzMF4ylITLm568z-8Jpi4T_slamOV6AQxlcXO0oQgltHzlQ4zS6_OCWb-gF8Aadvs4UDD9dv2PbTNKWIDs8edRf4zg3g&sa=X&ved=2ahUKEwjdsKmHq7CKAxULoK8BHVrlMckQtKgLegQIGhAB&biw=1297&bih=934&dpr=1`;
      const searchImageUrl = `https://www.google.co.kr/search?lr=lang_en&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJdMBGnhnRvYgS1nDooqVjX8ccGpw:1734491150904&q=${searchWord}&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWxyMMuf0D-HOMEpzq2zertRy7G-dme1ONMLTCBvZzSlhO4TKEdryJiDx5bWrq9blHq2bVKEdiUdHFMAS0aV1fP80s5bIT2vgAzFSu9ANBsRNzMF4ylITLm568z-8Jpi4T_slamOV6AQxlcXO0oQgltHzlQ4zS6_OCWb-gF8Aadvs4UDD9dv2PbTNKWIDs8edRf4zg3g&sa=X&ved=2ahUKEwjdsKmHq7CKAxULoK8BHVrlMckQtKgLegQIGhAB&biw=1297&bih=934&dpr=1&hl=en`;
      await page.goto(searchImageUrl);
      await page?.waitForSelector(
        "#rso > div > div > div.wH6SXe.u32vCb > div > div > div > div.juwGPd.BwPElf.OCzgxd > a",
      );
      const links = await page
        ?.locator(
          "#rso > div > div > div.wH6SXe.u32vCb > div > div > div > div.juwGPd.BwPElf.OCzgxd > a",
        )
        ?.evaluateAll((elements) =>
          elements.map((el) => {
            return decodeURIComponent((el as any).closest("a").href as any);
          }),
        );

      const filteredUrls = links?.filter((url) => {
        if (url) {
          const hostname = new URL(url).hostname; // URL에서 hostname 추출

          return whiteUrlList.includes(hostname); // whiteList에 hostname이 포함되어 있는지 확인
        }
        return false;
      });

      return filteredUrls;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};

const parsingImageSrc = async (hrefs: (string | undefined)[], page: Page) => {
  const allImageSrc: searchImageObject[] = [];
  for (const url of hrefs) {
    const image: string[] = [];
    if (url) {
      try {
        if (url.includes("reversible")) {
          //reversible 도 따로 긁어오자
          page.on("response", (response) => {
            const url = response.url();
            const isBlackList = imageBlackList.some((item) =>
              url.includes(item),
            );
            const headers = response.headers(); // 응답 헤더 가져오기
            const contentType = headers["content-type"]; // content-type 헤더 확인
            const contentLength = Number(headers["content-length"]); // content-type 헤더 확인

            if (
              contentType &&
              contentType.includes("image/jpeg") &&
              contentLength &&
              !url.includes("reversible-images-prod") &&
              !url.includes("image.reversible.com")
            ) {
              image.push(url);
            }
          });

          try {
            await page.goto(url, { waitUntil: "networkidle", timeout: 5000 });
          } catch (error) {}
        } else if (url.includes("thebs.com")) {
          // 더베이스는 따로 이미지를 긁어오자
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

          srcList.forEach((item) => {
            image.push(item);
          });
        } else {
          page.on("response", async (response) => {
            const responseUrl = response.url();
            const headers = response.headers(); // 응답 헤더 가져오기
            const contentType = headers["content-type"]; // content-type 헤더 확인
            const contentLength = Number(headers["content-length"]); // content-type 헤더 확인
            if (
              contentType &&
              (contentType.includes("image/jpg") ||
                contentType.includes("image/png") ||
                contentType.includes("image/webp") ||
                contentType.includes("image/jpeg") ||
                contentType.includes("image/gif") ||
                contentType.includes("image/avif"))
            ) {
              const isBlackList = imageBlackList.some((item) =>
                responseUrl.includes(item),
              );
              // Add an event listener to get dimensions when the image loads

              if (contentLength && contentLength > 6000 && !isBlackList) {
                image.push(responseUrl);
              }
            }
          });

          await page
            ?.goto(url, {
              waitUntil: "networkidle",
              timeout: 4000,
            })
            .catch((error) => {});

          await page.waitForTimeout(4000);
        }
        const parsedUrl = new URL(url);

        const result: imagUrlType[] = image.map((item) => {
          let newUrl = "";
          if (parsedUrl.hostname === "balaan.com") {
            newUrl = `https:${item}`;
          } else if (parsedUrl.hostname === "giraffehousevn.com") {
            newUrl = `${parsedUrl.origin}${item}`;
          }

          if (item?.startsWith("https://")) {
            newUrl = item;
          } else if (item?.startsWith("//")) {
            newUrl = `https:${item}`;
          } else if (item?.startsWith("/")) {
            newUrl = `${parsedUrl.origin}${item}`;
          }
          return { url: newUrl };
        });

        allImageSrc.push({ imageUrls: result, searchlinks: url });
      } catch (error) {
        console.log({ error }, "에러??");
        continue;
      }
    }
  }

  return allImageSrc;
};

const getSearchImagesUrl = async (
  getData: excelType,
  page: Page,
  whiteListBrand: string[],
) => {
  const searchlinks = await searchAndGrapHrefs(
    `${getData.브랜드} "${getData["모델명(추정)"]}"`,
    "search",
    page,
    whiteListBrand,
  );

  // const searchImagelinks = await searchAndGrapHrefs(
  //   getData["모델명(추정)"],
  //   "img",
  //   page,
  // );

  const concatList = [...searchlinks];

  const uniqArray = [...new Set(concatList)];
  // 모든 href를 타고 image Url 파싱
  try {
    const getSearchUrl = await parsingImageSrc(uniqArray, page);

    let allImageSrc: searchImageObject[] = [];

    allImageSrc = allImageSrc.concat(getSearchUrl);

    return allImageSrc;
  } catch (error) {
    return [];
  }
};

export {
  getTargetImages,
  getSearchImagesUrl,
  parsingImageSrc,
  searchAndGrapHrefs,
};
