/* eslint-disable @typescript-eslint/no-unused-vars */
import { chromium } from "@playwright/test";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { excelType } from "type/type";
import { getOneByOneCrawlingData } from "util/streamingFunc";
import { getFindItem, streamingDataParser } from "util/utils";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const getUrl = req.url || "";
  const { searchParams } = new URL(getUrl);
  const author = searchParams.get("author"); // Get specific parameter
  const isChromium = searchParams.get("isChromium") === "true"; // Get specific parameter
  let getList: excelType[] = [];
  if (author) {
    const getData = await getFindItem(undefined, author);
    if (getData) {
      getList = getData;
    }
  }

  //브랜드명이 들어간 화이트 리스트..
  const whiteList = getList.map((item) =>
    item.브랜드.replace(/\s+/g, "").toLowerCase(),
  );
  try {
    const stream = new ReadableStream({
      async start(controller) {
        const browser = await chromium.launch({
          headless: !isChromium,
        });

        const context = await browser.newContext({
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        });
        const page = await context.newPage();
        await page.setViewportSize({ width: 2000, height: 1000 });
        await page.evaluate(() =>
          window.scrollTo(0, document.body.scrollHeight),
        );

        try {
          let count = 0;
          const parsingTarGetList: ["musinsa", "okmall"] = [
            "musinsa",
            "okmall",
          ];

          for (const item of getList) {
            const getIndex = parsingTarGetList.findIndex(
              (parsingTarGetListItem) =>
                item.링크.includes(parsingTarGetListItem),
            );

            const getData = await getOneByOneCrawlingData(
              item,
              page,
              parsingTarGetList[getIndex],
              whiteList,
            );

            count++;
            controller.enqueue(
              streamingDataParser({
                status: "ing",
                data: getData,
                currentPage: count,
                maxPage: getList.length,
              }),
            );
          }
        } catch (error) {
          console.log(error);
          controller.error(error);
          controller.close();
          browser.close();
        } finally {
          controller.enqueue(streamingDataParser({ status: "end" }));
          controller.close();
          browser.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
  }
}
