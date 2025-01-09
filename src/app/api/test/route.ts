/* eslint-disable @typescript-eslint/no-unused-vars */
import { chromium } from "@playwright/test";
import { NextRequest, NextResponse } from "next/server";
import { getOnPage } from "util/testFunc";

export async function POST(req: NextRequest, res: NextResponse) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  await page.setViewportSize({ width: 2000, height: 1000 });

  try {
    const getData = await getOnPage(
      "https://www.thebs.com/en/wide-herringbone-blazer-maison-mihara-yasuhiro-332276",
      page,
    );
    return NextResponse.json({ data: getData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 200 });
  }
}
