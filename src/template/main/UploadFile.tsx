/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { excelType } from "type/type";
import { API } from "util/API";
import { parsingExcelToJSON } from "util/ExcelToJson";
import { exportJsonToExcel } from "util/JSONtoExcel";

const UploadFile = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isChromium, setIsChromium] = useState(true);

  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "text/csv", // .csv
  ];
  const validateFiles = (file: File) => {
    if (!allowedTypes.includes(file?.type)) {
      setError(".xls, .xlsx, .csv 만 등록가능합니다");
    } else {
      setFile(file);
      setError("");
    }
  };

  const onFileSelect = (file: File) => {
    validateFiles(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {};

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    onFileSelect(file); // Pass the files to the parent via callback
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget?.files[0];
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInput.current?.click();
  };

  const sampleFileDownLoad = () => {
    exportJsonToExcel(
      [
        {
          index: "",
          date: "",
          상품번호: "",
          링크: "",
          브랜드: "",
          카테고리: "",
          ["상품명(추정)"]: "",
          ["모델명(추정)"]: "",
          색상: "",
          성별: "",
          ["상품상세 이미지 1"]: "",
          ["상품상세 이미지 2"]: "",
          ["상품상세 이미지 3"]: "",
          ["상품상세 이미지 4"]: "",
          ["상품상세 이미지 5"]: "",
          ["상품상세 이미지 6"]: "",
          비고: "",
          담당자: "",
        },
      ],
      "sample.xlsx",
    );
  };

  const fileUpload = async () => {
    const getExcelData = await parsingExcelToJSON<excelType>(file);
    let isError = false;
    getExcelData.forEach((item) => {
      if (!item.담당자) {
        isError = true;
        alert("엑셀의 담당자이름을 모두 적어주세요!!!");
        return;
      }
    });
    try {
      const getData = await API.post<{ upload: boolean }>("/api/uploadExcel", {
        json: getExcelData,
      });

      if (!isError && getData.data.upload) {
        localStorage.removeItem("crawlingItem");
        localStorage.removeItem("progress");
        router.push(
          `DataTable?author=${getExcelData[0].담당자}&isChromium=${isChromium}`,
        );
      }
    } catch (error: any) {
      alert(error?.message);
    }
  };
  const [testData, setTestData] = useState([]);
  const test = async () => {
    const data = await API.post("/api/test");

    setTestData(data.data.data);
  };
  return (
    <div className="absolute left-[50%] flex h-[100%] w-[600px] translate-x-[-50%] flex-col justify-between">
      <form
        className="flex w-[100%] flex-col gap-[20px]"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* {testData.map((item) => {
          return (
            <Image key={item} src={item} width={200} height={200} alt="" />
          );
        })}
        <button
          onClick={test}
          className="h-[56px] rounded-[8px] border-[1px] border-black disabled:bg-slate-400"
        >
          테스트
        </button> */}
        <div
          className={`drop-zone relative h-[500px] cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {error ? (
            <div>
              <p className="text-red-500">{error}</p>
              <Image alt="upload" fill src={"/upLoad.png"} />
            </div>
          ) : file?.name ? (
            <div className="flex h-[100%] gap-1 p-3">
              <div>파일명 :</div>
              <div>{file?.name}</div>
              <Image alt="upload" fill src={"/upLoad.png"} />
            </div>
          ) : (
            <div className="relative h-[100%]">
              <Image alt="upload" fill src={"/upLoad.png"} />
              <div className="absolute bottom-4 left-[50%] flex translate-x-[-50%] flex-col items-center whitespace-pre-wrap break-words">
                <div>클릭해서 엑셀 파일을 등록하거나</div>
                <div>파일을 드래그 드롭 해주세요</div>
                <div>엑셀파일 업로드를 해주세요</div>
              </div>
            </div>
          )}

          <input
            ref={fileInput}
            accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </div>

        <button
          onClick={fileUpload}
          disabled={!file}
          className="h-[56px] rounded-[8px] border-[1px] border-black disabled:bg-red-700 disabled:text-white"
        >
          엑셀파일 업로드 (크롤링 스트림 페이지로 넘어갑니다)
        </button>
        <button
          onClick={sampleFileDownLoad}
          className="h-[56px] rounded-[8px] border-[1px] border-black disabled:bg-slate-400"
        >
          셈플파일 다운로드
        </button>
        <button
          onClick={() => {
            setIsChromium(!isChromium);
          }}
          className="h-[56px] rounded-[8px] border-[1px] border-black disabled:bg-slate-400"
        >
          크로니움 {isChromium ? "on" : "off"}
        </button>
      </form>
      <div className="text-end font-bold">0.993ver</div>
    </div>
  );
};

export default UploadFile;
