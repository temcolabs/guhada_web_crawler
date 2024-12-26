"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { excelType, selectImageTableType } from "type/type";
import { API } from "util/API";
import { parsingExcelToJSON } from "util/ExcelToJson";
import { exportJsonToExcel } from "util/JSONtoExcel";

const UploadFile = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="absolute left-[50%] w-[60%] translate-x-[-50%]">
      <div>엑셀파일을 올려주세요</div>
      <form
        className="flex h-[100%] flex-col gap-[20px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={`drop-zone relative h-[500px] cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <p>클릭해서 파일을 등록하거나, 파일을 드래그 드롭 해주세요</p>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : file?.name ? (
            file?.name
          ) : (
            <Image alt="upload" fill src={"/upload.png"} />
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
          className="h-[56px] rounded-[8px] border-[1px] border-black disabled:bg-slate-400"
        >
          엑셀파일 업로드
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
    </div>
  );
};

export default UploadFile;
