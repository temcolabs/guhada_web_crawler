"use client";
import { FormEvent, useEffect, useState } from "react";
import { exportExcelData, selectImageTableType } from "type/type";
import { exportJsonToExcel } from "util/JSONtoExcel";
import Header from "./Header";
import Rows from "./Rows";
import { FaFileExport } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

const DataTable = () => {
  const [data, setData] = useState<selectImageTableType[]>([]);

  const [progress, setProgress] = useState<{
    maxPage: number;
    currentPage: number;
  }>({ currentPage: 0, maxPage: 0 });
  const [streamState, setStreamState] = useState<"ready" | "ing" | "end">(
    "ready",
  );
  const [classificationCount, setClassificationCount] = useState(0);

  const progressPer =
    progress.currentPage / progress.maxPage
      ? (progress.currentPage / progress.maxPage) * 100
      : 0;
  const classificationPer = progress.maxPage
    ? (classificationCount / progress.maxPage) * 100
    : 0;

  const streamStart = () => {
    if (progress.currentPage > 0 && progress.currentPage === progress.maxPage) {
      alert("이미 완료되었습니다!");
      return;
    }
    const urlSearch = new URLSearchParams(location.search);
    const authorName = urlSearch.get("author");
    const isChromium = urlSearch.get("isChromium");
    const eventSource = new EventSource(
      `/api/streaming?author=${authorName}&isChromium=${isChromium}`,
    );

    eventSource.onmessage = (event) => {
      const data: {
        status: string;
        data: selectImageTableType;
        maxPage: number;
        currentPage: number;
      } = JSON.parse(event.data);

      if (data.status === "end") {
        eventSource.close();
        setStreamState("end");
        alert("크롤링이 끝났습니다!");
      } else if (data.status === "ing") {
        setStreamState("ing");
        setProgress({ currentPage: data.currentPage, maxPage: data.maxPage });
        setData((prev) => {
          return prev.concat(data.data);
        });
      }
    };

    eventSource.onerror = () => {
      alert("에러!");
      eventSource.close();
    };
  };

  const removeAllList = () => {
    setClassificationCount(0);
    localStorage.removeItem("crawlingItem");
    localStorage.removeItem("progress");
    setStreamState("ready");
    setData([]);
    setProgress({ currentPage: 0, maxPage: 0 });
  };

  const findCrawlingItem = (rowIndex: number) => {
    const copyData = [...data];
    const findItem = copyData.find((item) => item.index === rowIndex);

    return findItem;
  };

  const onClickSearchImages = (url: string | null, rowIndex: number) => {
    const copyData = [...data];
    const findItem = findCrawlingItem(rowIndex);

    if (url && findItem) {
      if (findItem.blackListImages.includes(url)) {
        return alert("블랙리스트에 있는 목록입니다!");
      }
      if (findItem.selectedImages.includes(url)) {
        findItem.selectedImages = findItem?.selectedImages.filter(
          (item) => item !== url,
        );
      } else {
        if (findItem?.selectedImages.length >= 6) {
          alert("6개를 초과할수 없습니다.");
        } else {
          findItem?.selectedImages.push(url);
        }
      }

      setData(copyData);
    }
  };

  const blackListImage = (url: string, rowIndex: number) => {
    const copyData = [...data];
    const findItem = findCrawlingItem(rowIndex);

    if (url && findItem) {
      const isInclude = findItem?.blackListImages.includes(url);
      if (isInclude) {
        findItem.blackListImages = findItem?.blackListImages.filter(
          (item) => item !== url,
        );
      } else {
        findItem.blackListImages.push(url);
      }
      setData(copyData);
    }
  };

  const hideCrawlingImageList = (rowIndex: number, searchlinks: string) => {
    const copyData = [...data];
    const getitem = findCrawlingItem(rowIndex);
    if (getitem) {
      const getImageListObject = getitem.crawlingImageUrl.find(
        (item) => item.searchlinks === searchlinks,
      );
      if (getImageListObject) {
        getImageListObject.isCrawlinImageUrlHide =
          !getImageListObject?.isCrawlinImageUrlHide;
      }
    }
    setData(copyData);
  };

  const addManualUrl = (
    e: FormEvent<HTMLFormElement>,
    rowIndex: number,
    url: string,
  ) => {
    e.preventDefault();
    const copyData = [...data];
    const findItem = findCrawlingItem(rowIndex);
    if (url && findItem) {
      if (findItem.selectedImages.length === 6) {
        return alert("6개이상 등록할수 없습니다!");
      }

      if (findItem.selectedImages.includes(url)) {
        alert("이미 선택한 목록에 있어요!");
      } else {
        findItem.selectedImages.push(url);
      }
      setData([...copyData]);
    } else {
      alert("이미지 url을 입력해주세요!");
    }
  };

  const deleteManualUrl = (url: string, rowIndex: number) => {
    const copyData = [...data];
    const findItem = findCrawlingItem(rowIndex);

    if (findItem?.selectedImages.includes(url)) {
      findItem.selectedImages = findItem?.selectedImages.filter(
        (item) => item !== url,
      );
    }
    setData([...copyData]);
  };

  const exportData = () => {
    const excelData: exportExcelData[] = [];
    const blackList: string[] = [];
    data.forEach((item) => {
      const index = item.index;
      const selectedUrls: string[] = [];

      item.selectedImages.forEach((item) => {
        selectedUrls.push(item);
      });
      item.blackListImages.forEach((item) => {
        blackList.push(item);
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

    const uniqueBlackList = [...new Set(blackList)];

    exportJsonToExcel<{ unselectedUrl: string }>(
      uniqueBlackList.map((item) => ({ unselectedUrl: item })),
      "blackList.xlsx",
    );

    exportJsonToExcel<exportExcelData>(excelData, "selectedList.xlsx");
  };

  useEffect(() => {
    console.log("asda?", streamState, progressPer);
    if (streamState !== "ready" || progressPer === 100) {
      localStorage.setItem("crawlingItem", JSON.stringify(data));
      localStorage.setItem("progress", JSON.stringify(progress));
    }
  }, [data, streamState, progress, progressPer]);

  useEffect(() => {
    if (progressPer === 100) {
      setStreamState("end");
    }
  }, [progressPer]);

  useEffect(() => {
    if (streamState === "ready") {
      const getdata = localStorage.getItem("crawlingItem");
      const getProgress = localStorage.getItem("progress");
      const parsingProgress = JSON.parse(getProgress || "{}");
      if (parsingProgress.maxPage) {
        setProgress(parsingProgress);
      }
      const parsingData = JSON.parse(getdata || "[]");
      if (parsingData.length > 0) {
        setData(parsingData);
      }
    }
  }, [streamState]);

  return (
    <div className="flex flex-col gap-[12px] pb-10">
      <div className="flex w-[100%]">
        <button
          className="h-[50px] flex-[8] bg-blue-400 text-white"
          onClick={streamStart}
        >
          크롤링 스트림 시작
        </button>
        <button
          className="h-[50px] flex-[2] bg-stone-300 text-black"
          onClick={removeAllList}
        >
          모두지우기
        </button>
      </div>
      <div className="sticky top-[0px] z-[100] bg-white">
        <div className="flex gap-2 pl-2">
          <div className="mr-2 flex-shrink-0">
            {progress.currentPage === progress.maxPage ? (
              <div>
                크롤링 완료 {progress.currentPage} / {progress.maxPage}
              </div>
            ) : (
              <div>
                크롤링중....
                {progress.currentPage} / {progress.maxPage}
              </div>
            )}
          </div>
          <div className="w-[100%] bg-white">
            <div
              className="bg-yellow-400"
              style={{
                width: `${progressPer}%`,
              }}
            >
              {Math.floor(progressPer)}%
            </div>
          </div>
        </div>
        <div className="flex gap-2 pl-2">
          <div className="flex flex-shrink-0 gap-2">
            <div>분류 진행중</div>
            {classificationCount} / {progress.maxPage}
          </div>
          <div className="w-[100%] bg-white">
            <div
              className="bg-yellow-400"
              style={{
                width: `${classificationPer}%`,
              }}
            >
              {Math.floor(classificationPer)}%
            </div>
          </div>
        </div>
        <Header />
      </div>
      {data?.map((crawlingData, index) => (
        <Rows
          index={index}
          rowIndex={crawlingData.index}
          crawlingData={crawlingData}
          key={index}
          setClassificationCount={setClassificationCount}
          hideCrawlingImageList={hideCrawlingImageList}
          onClickSearchImages={onClickSearchImages}
          addManualUrl={addManualUrl}
          deleteManualUrl={deleteManualUrl}
          blackListImage={blackListImage}
        />
      ))}
      <div className="fixed bottom-5 right-2 z-40 flex flex-col items-end gap-5 p-2">
        <button onClick={exportData}>
          <FaFileExport color="green" size={35} />
        </button>
        <button
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          <FaArrowAltCircleUp color="lightblue" size={35} />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
