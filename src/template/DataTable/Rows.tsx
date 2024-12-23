import Image from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import LazyLoad from "react-lazy-load";
import { selectImageTableType } from "type/type";

interface RowsProps {
  rowIndex: number;
  crawlingData: selectImageTableType;
  selectIndex: number;
  setSelectIndex: Dispatch<SetStateAction<number>>;
  onClickSearchImages: (url: string | null, index: number) => void;
  addManualUrl: (
    e: FormEvent<HTMLFormElement>,
    rowIndex: number,
    url: string,
  ) => void;
  deleteManualUrl: (url: string, rowIndex: number) => void;
  searchImpossible: (
    e: MouseEvent<HTMLButtonElement>,
    rowIndex: number,
  ) => void;
  index: number;
}
const Rows = ({
  crawlingData,
  selectIndex,
  setSelectIndex,
  onClickSearchImages,
  addManualUrl,
  rowIndex,
  deleteManualUrl,
  searchImpossible,
  index,
}: RowsProps) => {
  const [addUrlVisible, setAddUrlVisible] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const addImageUrl = () => {
    setAddUrlVisible(!addUrlVisible);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div
      className={`flex w-[100%] flex-row border-[1px] border-solid border-black ${
        crawlingData.index === selectIndex ? "bg-slate-500" : ""
      } ${crawlingData.searchImpossible ? "debug" : ""} `}
    >
      <div
        onClick={() => {
          if (selectIndex === crawlingData.index) {
            setSelectIndex(-1);
          } else {
            setSelectIndex(crawlingData.index);
          }
        }}
        className="w-[50px] border-r-[1px] border-solid border-black"
      >
        <div className="flex h-[calc(100%-23px)] items-center justify-center">
          {index + 1}
        </div>
      </div>
      <div className="w-[100px] border-r-[1px] border-solid border-black">
        <div className="pl-[2px flex h-[calc(100%-23px)] items-center justify-center text-blue-300">
          <Link href={crawlingData?.originalLink} target="_blank">
            {crawlingData.index}
          </Link>
        </div>
      </div>
      <div className="w-[80px] border-r-[1px] border-solid border-black">
        <div className="flex h-[calc(100%-23px)] items-center justify-center pl-[2px] text-blue-300">
          <Link
            className="w-[100%] break-words"
            href={`https://www.google.co.kr/search?q=${crawlingData.productInfo.brand}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
            target="_blank"
          >
            {crawlingData.productInfo.brand}
          </Link>
        </div>
      </div>
      <div className="w-[120px] border-r-[1px] border-solid border-black">
        <div className="flex h-[calc(100%-23px)] items-center justify-center pl-[2px] text-blue-300">
          <Link
            className="w-[100%] break-words"
            href={`https://www.google.co.kr/search?q=${crawlingData.productInfo.modalName}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
            target="_blank"
          >
            {crawlingData.productInfo.modalName}
          </Link>
          <Link
            className="w-[100%] break-words"
            href={`https://www.google.co.kr/search?q=${crawlingData.productInfo.brand} ${crawlingData.productInfo.modalName}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
            target="_blank"
          >
            {`${crawlingData.productInfo.brand} ${crawlingData.productInfo.modalName}`}
          </Link>
        </div>
      </div>
      <div className="w-[150px] border-r-[1px] border-solid border-black">
        <div className="flex h-[calc(100%-23px)] items-center justify-center pl-[2px] text-[11px] text-blue-300">
          <Link
            className="w-[100%] break-words"
            href={`https://www.google.co.kr/search?q=${crawlingData.productInfo.name}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
            target="_blank"
          >
            {crawlingData.productInfo.name}
          </Link>
        </div>
      </div>
      <div className="w-[601px] border-r-[1px] border-solid border-black">
        <LazyLoad>
          <div className="sticky flex flex-wrap">
            {crawlingData.productImageUrl.map((item, index) => {
              return (
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item, "_blank");
                  }}
                  style={{
                    position: "relative",
                    width: 150,
                    height: 150,
                  }}
                  key={item + index + 102102}
                >
                  <Image
                    fill
                    loading="lazy"
                    sizes="150px"
                    alt="item"
                    src={item}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
        </LazyLoad>
      </div>
      <div className="w-[50px] border-r-[1px] border-solid border-black">
        <div className="flex h-[calc(100%-23px)] items-center justify-center">
          {crawlingData.index}
        </div>
      </div>
      <div className="w-[501px] border-r-[1px] border-solid border-black">
        <div className="flex-wrap overflow-auto">
          <div className="flex">
            <div>총 선택한 갯수 : </div>
            {crawlingData.selectedImageLength}
          </div>

          {crawlingData.crawlingImageUrl.map(
            ({ imageUrls, searchlinks }, index) => {
              const urlpars = new URL(searchlinks);
              if (searchlinks.length === 0) {
                return null;
              }
              return (
                <LazyLoad key={searchlinks + index + 1}>
                  <div className="overflow-auto">
                    <div className="overflow-hidden text-ellipsis">
                      <Link
                        target="_blank"
                        className="text-blue-500"
                        href={searchlinks}
                      >
                        {urlpars.hostname}
                      </Link>
                    </div>
                    <div className="flex overflow-auto">
                      {imageUrls.map(({ url, selected }) => {
                        return (
                          <div
                            key={url ? url + 1212121111 : url}
                            className={`shrink-0 cursor-pointer ${selected ? "debug" : ""}`}
                            style={{
                              position: "relative",
                              width: 150,
                              height: 150,
                            }}
                          >
                            <Image
                              onClick={() => {
                                if (url) {
                                  onClickSearchImages(url, crawlingData.index);
                                }
                              }}
                              fill
                              loading="lazy"
                              sizes="150px"
                              alt="item"
                              src={url ? url : ""}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </LazyLoad>
              );
            },
          )}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          setUrl("");
          addManualUrl(e, rowIndex, url);
          inputRef.current?.focus();
        }}
        className="flex w-[150px] flex-col border-r-[1px] border-solid border-black"
      >
        <button type="button">직접 추가하기</button>

        <input
          ref={inputRef}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
          type="text"
          className="w-[100%] border-[1px] border-solid border-black"
        />
        <button type="submit">추가</button>

        <div className="flex flex-col">
          {crawlingData?.manualUrl?.map((item, index) => {
            return (
              <div key={item + "" + index}>
                <Image
                  className="debug"
                  width={100}
                  height={100}
                  alt="이미지"
                  src={item}
                />
                <button
                  onClick={() => {
                    deleteManualUrl(item, rowIndex);
                  }}
                  type="button"
                >
                  지우기
                </button>
              </div>
            );
          })}
        </div>
      </form>
      {/* <button
        onClick={(e) => {
          searchImpossible(e, rowIndex);
        }}
        type="button"
      >
        못찾겠어요...
      </button> */}
    </div>
  );
};

export default Rows;
