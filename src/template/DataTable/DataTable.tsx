"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { excelType, exportExcelData, selectImageTableType } from "type/type";

import useStreming from "Hooks/useStreming";
import { exportJsonToExcel } from "util/JSONtoExcel";
import Header from "./Header";
import Rows from "./Rows";

const DataTable = () => {
  const [data, setData] = useState<selectImageTableType[]>([]);
  const [selectIndex, setSelectIndex] = useState(-1);
  const [testData, setTestData] = useState<string[]>([]);
  const [isChange, setIsChange] = useState(false);

  const excelData = JSON.parse(
    localStorage.getItem("saveData") as string,
  ) as excelType[];

  const { data: streamData, isStreamEnded } = useStreming({
    api: "/api/streaming",
    excelData: excelData ? excelData : [],
  });

  const findCrawlingItem = (rowIndex: number) => {
    const copyData = [...data];
    const findItem = copyData.find((item) => item.index === rowIndex);
    setIsChange(true);
    return findItem;
  };

  const onClickSearchImages = (url: string | null, rowIndex: number) => {
    const copyData = [...data];
    const findItem = findCrawlingItem(rowIndex);

    if (findItem && findItem.crawlingImageUrl) {
      if (findItem.selectedImageLength === undefined) {
        findItem.selectedImageLength = 0;
      }
      const getSamUrlObject = findItem.crawlingImageUrl.find((item) =>
        item.imageUrls.find((item) => item.url === url),
      );
      const getSameUrl = getSamUrlObject?.imageUrls.find(
        (item) => item.url === url,
      );
      if (findItem.selectedImageLength === undefined) {
        findItem.selectedImageLength = 0;
      }
      if (getSamUrlObject) {
        if (getSameUrl && getSameUrl.selected) {
          if (findItem.selectedImageLength > 0) {
            findItem.selectedImageLength--;
          } else {
            findItem.selectedImageLength = 0;
          }
          getSameUrl.selected = false;
        } else if (getSameUrl && !getSameUrl.selected) {
          if (findItem.selectedImageLength <= 5) {
            getSameUrl.selected = true;
            findItem.selectedImageLength++;
          } else {
            alert("6개를 초과할수 없습니다.");
          }
        }

        setData(copyData);
      }
    }
  };

  const addManualUrl = (
    e: FormEvent<HTMLFormElement>,
    rowIndex: number,
    url: string,
  ) => {
    e.preventDefault();

    if (url) {
      const copyData = [...data];
      const findItem = findCrawlingItem(rowIndex);

      if (findItem && findItem.crawlingImageUrl) {
        if (findItem.selectedImageLength === undefined) {
          findItem.selectedImageLength = 0;
        }
        if (findItem?.manualUrl?.includes(url)) {
          return alert("이미있는 이미지 주소입니다.");
        }
        if (findItem.manualUrl === undefined) {
          findItem.manualUrl = [];
          findItem.manualUrl.push(url);
        } else {
          findItem.manualUrl.push(url);

          findItem.selectedImageLength++;
        }
      }
      setData([...copyData]);
    } else {
      alert("이미지 url을 입력해주세요!");
    }
  };
  const deleteManualUrl = (url: string, rowIndex: number) => {
    const copyData = [...data];
    const findItem = findCrawlingItem(rowIndex);

    if (findItem && findItem.manualUrl) {
      if (findItem.selectedImageLength >= 0) {
        findItem.selectedImageLength--;
      } else {
        findItem.selectedImageLength = 0;
      }
      findItem.manualUrl = findItem?.manualUrl.filter((item) => item !== url);
    }
    setData([...copyData]);
  };

  const exportData = () => {
    const excelData: exportExcelData[] = [];
    data.forEach((item) => {
      const index = item.index;
      const selectedUrls: string[] = [];
      item.manualUrl.forEach((item) => {
        if (typeof item === "string") {
          selectedUrls.push(item);
        }
      });
      item.crawlingImageUrl.forEach((item) => {
        item.imageUrls.forEach((url, index) => {
          if (url.selected) {
            if (url.url) selectedUrls.push(url.url);
          }
        });
      });
      excelData.push({
        index,
        브랜드: item.productInfo.brand,
        상품명: item.productInfo.name,
        모델명: item.productInfo.modalName,
        ["상품상세 이미지 1"]: selectedUrls[0],
        ["상품상세 이미지 2"]: selectedUrls[1],
        ["상품상세 이미지 3"]: selectedUrls[2],
        ["상품상세 이미지 4"]: selectedUrls[3],
        ["상품상세 이미지 5"]: selectedUrls[4],
        ["상품상세 이미지 6"]: selectedUrls[5],
      });
    });

    exportJsonToExcel<exportExcelData>(excelData);
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div>okmall비교 {data.length}개</div>
      {/* <button className="fixed bottom-10 right-2 z-40" onClick={test}>
        테스트하기
      </button> */}
      <button className="fixed bottom-20 right-2 z-40" onClick={exportData}>
        내보내기
      </button>
      <div className="flex overflow-auto">
        {testData.map((item) => {
          return (
            <Image key={item} src={item} alt="" width={100} height={100} />
          );
        })}
      </div>
      <Header />
      {data.map((crawlingData, index) => (
        <Rows
          index={index}
          rowIndex={crawlingData.index}
          crawlingData={crawlingData}
          onClickSearchImages={onClickSearchImages}
          key={index}
          addManualUrl={addManualUrl}
          deleteManualUrl={deleteManualUrl}
        />
      ))}
      <button
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
        className="fixed bottom-5 right-2"
      >
        위로
      </button>
    </div>
  );
};

export default DataTable;
