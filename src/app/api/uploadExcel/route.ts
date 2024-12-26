import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { excelType } from "type/type";
import { crawlingDataToFile, fileGenerator } from "util/utils";

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const getBody: { json: excelType[] } = await req.json();

    const getAhthor = getBody.json[0].담당자;
    const object = { getAhthor, list: getBody.json };
    const getData = await crawlingDataToFile(undefined, object);
    console.log(getData);
    return NextResponse.json({ upload: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { upload: false, message: "업로드실패!", error },
      { status: 200 },
    );
  }
}
