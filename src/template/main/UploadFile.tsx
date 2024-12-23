"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { selectImageTableType } from "type/type";
import { API } from "util/API";

const UploadFile = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  const onSubmit = async () => {
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("target", "okmall");
      try {
        const getData = await API.post<{
          message: string;
          data: selectImageTableType[];
        }>("/api/crawling", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 300000000000000,
        });

        localStorage.setItem("crawlingData", JSON.stringify(getData.data.data));
        router.push("/DataTable");
      } catch (error) {
        alert("에러남!");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const testButton = async () => {
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const getData = await API.post<{
          message: string;
          data: selectImageTableType[];
        }>("/api/test", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 300000000000000,
        });
        // console.log(getData.data.data);
      } catch (error) {
        alert("에러남!");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (isLoading) {
    return <div>로딩중......크롤링 양에 따라 10~20분 정도 걸릴수있습니다</div>;
  }

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
          onClick={onSubmit}
          disabled={!file}
          className="h-[56px] rounded-[8px] border-[1px] border-black disabled:bg-slate-400"
        >
          클로링시작
        </button>
        {/* <button
          onClick={testButton}
          disabled={!file}
          className="h-[56px] rounded-[8px] border-[1px] border-black disabled:bg-slate-400"
        >
          테스트
        </button> */}
      </form>
    </div>
  );
};

export default UploadFile;
