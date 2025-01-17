import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { FaRegCopy } from "react-icons/fa";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";
import {
  MdCheckBoxOutlineBlank,
  MdHideImage,
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistRemove,
} from "react-icons/md";
import { TbSlideshow } from "react-icons/tb";
import LazyLoad from "react-lazy-load";
import { selectImageTableType } from "type/type";
interface RowsProps {
  rowIndex: number;
  crawlingData: selectImageTableType;
  onClickSearchImages: (url: string | null, rowIndex: number) => void;
  addManualUrl: (
    e: FormEvent<HTMLFormElement>,
    rowIndex: number,
    url: string,
  ) => void;
  deleteManualUrl: (url: string, rowIndex: number) => void;
  index: number;
  hideCrawlingImageList: (rowIndex: number, searchlinks: string) => void;
  blackListImage: (url: string, rowIndex: number) => void;

  setClassificationCount: Dispatch<SetStateAction<number>>;
}
const Rows = ({
  crawlingData,
  onClickSearchImages,
  addManualUrl,
  rowIndex,
  deleteManualUrl,
  index,
  hideCrawlingImageList,
  blackListImage,

  setClassificationCount,
}: RowsProps) => {
  const [isAllFind, setIsAllFind] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isSelectedList = (url: string) => {
    return crawlingData.selectedImages.includes(url);
  };

  if (isAllFind) {
    return (
      <button
        onClick={() => {
          setClassificationCount((prev) => prev - 1);
          setIsAllFind(!isAllFind);
        }}
        className="flex h-[35px] items-center justify-end gap-1 border-[1px] border-solid border-black pr-1"
      >
        <div className="justify- flex items-center justify-end text-[14px]">
          Total : {" " + crawlingData.selectedImages.length}
        </div>
        <div className="flex items-center justify-end text-end">
          <IoCheckboxOutline color="lightblue" size={20} />
        </div>
      </button>
    );
  }
  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          setClassificationCount((prev) => prev + 1);
          setIsAllFind(!isAllFind);
        }}
        className="flex h-[35px] items-center justify-end gap-1 border-[1px] border-solid border-black border-b-white pr-1"
      >
        <div className="justify- flex items-center justify-end text-[14px]">
          Total : {" " + crawlingData.selectedImages.length}
        </div>
        <div className="flex items-center justify-end text-end">
          <MdCheckBoxOutlineBlank color="lightblue" size={20} />
        </div>
      </button>
      <div className="flex w-[100%] flex-row border-[1px] border-solid border-black">
        <div className="w-[2.5%] border-r-[1px] border-solid border-black">
          <div className="flex h-[100%] justify-center pt-3">{index + 1}</div>
        </div>
        <div className="w-[5.5%] border-r-[1px] border-solid border-black">
          <div className="pl-[2px flex h-[calc(100%-23px)] justify-center pt-3 text-blue-300">
            <Link href={crawlingData?.originalLink} target="_blank">
              {crawlingData.index}
            </Link>
          </div>
        </div>
        <div className="w-[6%] border-r-[1px] border-solid border-black">
          <div className="flex h-[calc(100%-23px)] justify-center pl-[2px] pt-3 text-blue-300">
            <Link
              className="w-[100%] break-words text-center text-[12px]"
              href={`https://www.google.co.kr/search?q=${crawlingData.productInfo.brand}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
              target="_blank"
            >
              {crawlingData.productInfo.brand}
            </Link>
          </div>
        </div>
        <div className="w-[10.9%] border-r-[1px] border-solid border-black p-2">
          <div className="flex h-[100%] items-start justify-evenly gap-1 text-blue-300">
            <div className="w-[45%] break-words text-[14px]">
              <Link
                className="break-words text-[14px]"
                href={`https://www.google.co.kr/search?q="${crawlingData.productInfo.modalName}"&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
                target="_blank"
              >
                {crawlingData.productInfo.modalName}
              </Link>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    crawlingData.productInfo.modalName,
                  );
                }}
              >
                <FaRegCopy />
              </div>
            </div>

            <div className="w-[45%] break-words text-[14px]">
              <Link
                className="break-words"
                onClick={() => {
                  navigator.clipboard.writeText(
                    crawlingData.productInfo.modalName,
                  );
                }}
                href={`https://www.google.co.kr/search?q=${crawlingData.productInfo.brand}+"${crawlingData.productInfo.modalName}"&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
                target="_blank"
              >
                {`${crawlingData.productInfo.brand} ${crawlingData.productInfo.modalName}`}
              </Link>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigator.clipboard.writeText(`
                  ${crawlingData.productInfo.brand} ${crawlingData.productInfo.modalName}`);
                }}
              >
                <FaRegCopy />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[5%] border-r-[1px] border-solid border-black p-2">
          <div className="flex h-[100%] items-start justify-evenly gap-3 text-blue-300">
            <Link
              className="w-[100%] break-words text-center text-[14px]"
              href={`https://www.google.co.kr/search?q=${crawlingData.productInfo.name}&sca_esv=48a32a8a53a0fe13&sxsrf=ADLYWIJ3uYJX1CanmgT2nB9VAMPFiLO34w%3A1734423586966&source=hp&ei=IjRhZ6LVN6LS1e8Pi5GRgQw&iflsig=AL9hbdgAAAAAZ2FCMvyWWlfooNP991xDXeoTk_7av4-K&ved=0ahUKEwii7qaur66KAxUiafUHHYtIJMAQ4dUDCBo&uact=5&oq=XFPPU8554-21&gs_lp=Egdnd3Mtd2l6IgxYRlBQVTg1NTQtMjEyCBAAGIAEGKIESMEEUHxYfHABeACQAQCYAYwBoAGMAaoBAzAuMbgBA8gBAPgBAvgBAZgCAqAClgGoAgrCAgcQIxgnGOoCmAMJ8QV9IkCVHGMs2ZIHAzEuMaAHcg&sclient=gws-wiz`}
              target="_blank"
            >
              {crawlingData.productInfo.name}
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigator.clipboard.writeText(crawlingData.productInfo.name);
                }}
              >
                <FaRegCopy />
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[20%] border-r-[1px] border-solid border-black">
          <LazyLoad>
            <div className="sticky flex flex-wrap gap-1">
              {crawlingData.productImageUrl.map((item, index) => {
                return (
                  <div
                    key={item + index + "image"}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item, "_blank");
                    }}
                    style={{
                      position: "relative",
                      width: "24.2%",
                      height: "100px",
                    }}
                  >
                    <Image
                      fill
                      loading="lazy"
                      sizes="150px"
                      alt="item"
                      src={item}
                      style={{ objectFit: "contain" }}
                      quality={100}
                    />
                  </div>
                );
              })}
            </div>
          </LazyLoad>
        </div>
        <div className="w-[2.5%] border-r-[1px] border-solid border-black">
          <div className="flex h-[calc(100%-23px)] items-center justify-center text-[16px]">
            {crawlingData.index}
          </div>
        </div>
        <div className="w-[25%] border-r-[1px] border-solid border-black pl-2 pr-2">
          <div className="flex-wrap overflow-auto">
            {crawlingData.crawlingImageUrl.map(
              ({ imageUrls, searchlinks, isCrawlinImageUrlHide }, index) => {
                const urlpars = new URL(searchlinks);

                if (isCrawlinImageUrlHide) {
                  return (
                    <div
                      className="flex justify-between"
                      key={index + "lazyLoad "}
                    >
                      <Link
                        target="_blank"
                        className="text-blue-500"
                        href={searchlinks}
                      >
                        {urlpars.hostname}
                      </Link>

                      <button
                        onClick={() => {
                          hideCrawlingImageList(rowIndex, searchlinks);
                        }}
                      >
                        <TbSlideshow size={25} />
                      </button>
                    </div>
                  );
                }

                return (
                  <LazyLoad key={index + "lazyLoad "}>
                    <div className="mt-2 overflow-auto">
                      <div className="mb-2 flex items-center justify-between overflow-hidden text-ellipsis">
                        <Link
                          target="_blank"
                          className="text-blue-500"
                          href={searchlinks}
                        >
                          {urlpars.hostname}
                        </Link>

                        {imageUrls.length > 0 && (
                          <button
                            onClick={() => {
                              hideCrawlingImageList(rowIndex, searchlinks);
                            }}
                          >
                            <MdHideImage size={25} />
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2 overflow-auto">
                        {imageUrls.map(({ url }, index) => {
                          const isSelected =
                            url && crawlingData.selectedImages.includes(url);
                          const isBlackList =
                            url && crawlingData.blackListImages.includes(url);
                          if (url)
                            return (
                              <div
                                key={url ? url + index + "url" : index}
                                className={`relative w-[25%] shrink-0 cursor-pointer ${isSelected ? "selected" : ""} ${isBlackList ? "blackList" : ""} `}
                              >
                                <div
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    height: 150,
                                  }}
                                >
                                  <Image
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();

                                      onClickSearchImages(
                                        url,
                                        crawlingData.index,
                                      );
                                    }}
                                    fill
                                    loading="lazy"
                                    sizes="150px"
                                    alt="item"
                                    src={url}
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    window.open(url, "_blank");
                                  }}
                                  className="absolute right-0 top-0"
                                >
                                  <HiOutlineArrowsExpand size={20} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    if (url) {
                                      onClickSearchImages(
                                        url,
                                        crawlingData.index,
                                      );
                                    }
                                  }}
                                  className="absolute bottom-0 left-0"
                                >
                                  <MdOutlinePlaylistAdd
                                    color="green"
                                    size={25}
                                  />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (isSelectedList(url as string)) {
                                      return alert(
                                        "선택된 리스트에 있는 아이템입니다",
                                      );
                                    }
                                    if (url) {
                                      blackListImage(url, rowIndex);
                                    }
                                  }}
                                  className="absolute bottom-0 right-0"
                                >
                                  <MdOutlinePlaylistRemove
                                    color="red"
                                    size={25}
                                  />
                                </button>
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
          className="flex w-[15%] flex-col justify-between border-r-[1px] border-solid border-black"
        >
          <div className="flex flex-wrap gap-1 p-2">
            <div className="w-[100%] text-start text-[14px]">
              Total : {crawlingData.selectedImages.length}
            </div>
            {crawlingData?.selectedImages?.map((item, index) => {
              return (
                <div className="relative w-[32%]" key={item + index}>
                  <Image width={150} height={150} alt="이미지" src={item} />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteManualUrl(item, rowIndex);
                    }}
                    className="absolute right-0 top-0"
                  >
                    <IoMdClose size={20} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="p-1">
            <div className="flex gap-1">
              <input
                ref={inputRef}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                placeholder="이미지 주소 입력"
                value={url}
                type="text"
                className="w-[85%] border-[1px] border-solid border-black placeholder:text-[14px]"
              />
              <button
                className="w-[15%] rounded-[8px] border-[1px] border-black text-[14px]"
                type="submit"
              >
                추가
              </button>
            </div>
          </div>
        </form>
        <div className="w-[8%]">
          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              onClick={() => {
                window.open(
                  `https://www.poizon.com/search?keyword=${crawlingData.productInfo.modalName}&track_referer_source=m1`,
                  "_blank",
                );
              }}
              className="w-[65%] rounded-[8px] border-[1px] border-black text-[14px]"
            >
              poizon
            </button>
            <button
              onClick={() => {
                window.open(
                  `https://www.buyma.com/r/${crawlingData.productInfo.modalName}/`,
                  "_blank",
                );
              }}
              className="w-[65%] rounded-[8px] border-[1px] border-black text-[14px]"
            >
              buyma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Rows);
