/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { crawlingDataType, excelType } from "type/type";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * ms));
const random = (ms: number) => Math.random() * ms;

const fileGenerator = <T extends object>(fileName: string, paramData: T) => {
  fs.readFile(fileName, "utf8", async (err, data) => {
    if (err) {
      fs.writeFile(fileName, JSON.stringify([paramData]), (err: any) => {});
    } else {
      const getData: object[] = JSON.parse(data);
      getData.push({ ...paramData });

      fs.writeFile(fileName, JSON.stringify(getData), (err: any) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
        }
      });
    }
  });
};

const crawlingDataToFile = (
  fileName: string = "./crawlingData.json",
  paramData: crawlingDataType,
) => {
  fs.readFile(fileName, "utf8", (err, data: string) => {
    if (err) {
      fs.writeFile(fileName, JSON.stringify([paramData]), (err: any) => {});
    } else {
      if (!data) {
        data = "[]";
      }
      let getData: crawlingDataType[] = JSON.parse(data);
      const sameAuther = getData.find(
        (item) => item.author === paramData.author,
      );
      if (sameAuther) {
        sameAuther.list = paramData.list;
      } else {
        getData.push(paramData);
      }

      fs.writeFile(fileName, JSON.stringify(getData), (err: any) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
        }
      });
    }
  });
};

const getFindItem = (
  fileName: string = "./crawlingData.json",
  author: string,
): Promise<excelType[] | undefined> => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err); // 에러 발생 시 reject
        return;
      }

      const getData: crawlingDataType[] = JSON.parse(data); // 파일 데이터 파싱
      const findItem = getData.find((item) => item.author === author);
      resolve(findItem?.list); // 성공적으로 값을 찾으면 resolve
    });
  });
};

const streamingDataParser = (getData: any) => {
  return new TextEncoder().encode(`data: ${JSON.stringify(getData)}\n\n`);
};
export {
  delay,
  fileGenerator,
  random,
  crawlingDataToFile,
  getFindItem,
  streamingDataParser,
};
