/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * ms));
const random = (ms: number) => Math.random() * ms;

const fileGenerator = <T extends object>(fileName: string, paramData: T) => {
  fs.readFile(fileName, "utf8", async (err, data) => {
    if (err) {
      fs.writeFile(fileName, JSON.stringify([paramData]), (err: any) => {
        console.log("File has been written successfully!");
      });
    } else {
      const getData: object[] = JSON.parse(data);
      getData.push({ ...paramData });

      fs.writeFile(fileName, JSON.stringify(getData), (err: any) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File has been written successfully!");
        }
      });
    }
  });
};
export { delay, fileGenerator, random };
