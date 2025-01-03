/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page } from "@playwright/test";
import imageBlackList from "hostNameList/imageBlackList";
import whiteUrlList from "hostNameList/whiteUrlList";
import { excelType, imagUrlType, searchImageObject } from "type/type";
import { random } from "./utils";

const getOkmallImage = async (
  page: Page,
  data: excelType,
  imagesTarget: string,
) => {
  try {
    await page.goto(data["링크"], {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    const getThumbnail = page.locator(imagesTarget);
    const count = await getThumbnail.count();
    const imgSrcList: string[] = [];
    for (let i = 0; i < count; i++) {
      const imgSrc = await getThumbnail.nth(i).getAttribute("src");
      if (imgSrc) {
        imgSrcList.push(`https:${imgSrc}`);
      }
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
      // const searchUrl = `https://www.google.co.kr/search?q=${searchWord} ${filterSearchWord} &sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWILkWAJ5zBsSlhWU0QraCMcHiSIGAQ:1734491139020&lr=lang_en&sa=X&ved=2ahUKEwjI_tOBq7CKAxWXk68BHU36BFAQuAF6BAgJEAE&biw=1297&bih=934&dpr=1`;
      // const searchUrl = `https://www.google.co.kr/search?q=${searchWord}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWILkWAJ5zBsSlhWU0QraCMcHiSIGAQ:1734491139020&lr=lang_en&sa=X&ved=2ahUKEwjI_tOBq7CKAxWXk68BHU36BFAQuAF6BAgJEAE&biw=1297&bih=934&dpr=1`;
      // const searchUrl = `https://www.google.co.kr/search?q=${searchWord}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz&hl=en`;
      const searchUrl = `https://www.google.co.kr/search?q=${searchWord}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIKP6wBfj2ZcPKNujDXmeaWICOpKIg:1735540086660&lr=lang_en&sa=X&ved=2ahUKEwjnlO_S7s6KAxV1UfUHHbkoOHcQuAF6BAgNEAE&biw=1918&bih=931`;

      // await delay(4000);
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

        // fileGenerator("getLinks.json", [getLinks]);
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
            // if (whiteList.includes(url.hostname)) {
            // }
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
    if (url) {
      const image: string[] = [];
      try {
        // Attach an error listener
        page.on("pageerror", async (error) => {
          // await page.screenshot({ path: "debug-screenshot.png" });
          // console.error(`Page error on ${url}:`, error.message);
        });

        // 패이지 안에서 필요없는 요청은 거른다.
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
            responseUrl.includes(".jpg") ||
            responseUrl.includes(".png") ||
            responseUrl.includes(".webp") ||
            responseUrl.includes(".jpeg") ||
            responseUrl.includes(".gif")
          ) {
            const isBlackList = imageBlackList.some((item) =>
              responseUrl.includes(item),
            );
            // Add an event listener to get dimensions when the image loads
            const contentsSize = response.headers()["content-length"];

            if (!isNaN(Number(contentsSize))) {
              if (Number(contentsSize) > 7000) {
                if (!isBlackList) {
                  image.push(responseUrl);
                }
              }
            }
          }
        });

        await page?.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });

        const parsedUrl = new URL(url);

        const result: imagUrlType[] = image.map((item) => {
          let object = "";
          if (parsedUrl.hostname === "balaan.com") {
            object = `https:${item}`;
          } else if (parsedUrl.hostname === "giraffehousevn.com") {
            object = `${parsedUrl.origin}${item}`;
          }

          if (item?.startsWith("https://")) {
            object = item;
          } else if (item?.startsWith("//")) {
            object = `https:${item}`;
          } else if (item?.startsWith("/")) {
            object = `${parsedUrl.origin}${item}`;
          }
          return { url: object, selected: false };
        });

        allImageSrc.push({ imageUrls: result, searchlinks: url });
      } catch (error) {
        console.log({ error });
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
    `${getData.브랜드} ${getData["모델명(추정)"]}`,
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
  getOkmallImage,
  getSearchImagesUrl,
  parsingImageSrc,
  searchAndGrapHrefs,
};
