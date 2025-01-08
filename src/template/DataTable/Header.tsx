import React from "react";

interface HeaderProps {}
const Header = ({}: HeaderProps) => {
  return (
    <div className="flex w-[100%] border-[1px] border-solid border-black">
      <div className="w-[2.5%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          index
        </div>
      </div>
      <div className="w-[5.5%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          uniqueindex
        </div>
      </div>
      <div className="w-[6%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          브랜드
        </div>
      </div>
      <div className="w-[11%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          모델명 / 브랜드 + 모델명
        </div>
      </div>

      <div className="w-[5%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          상품명
        </div>
      </div>
      <div className="w-[20%] border-r-[1px] border-solid border-black">
        <div className="flex justify-center border-b-[1px] border-solid border-black">
          사진
        </div>
      </div>

      <div className="w-[2.5%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          index
        </div>
      </div>
      <div className="w-[25%] border-r-[1px] border-solid border-black">
        <div className="flex justify-center border-b-[1px] border-solid border-black">
          사진
        </div>
      </div>
      <div className="w-[15%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          선택한 이미지들
        </div>
      </div>
      <div className="w-[8%] border-r-[1px] border-solid border-black">
        <div className="border-b-[1px] border-solid border-black text-center">
          Site검색
        </div>
      </div>
    </div>
  );
};

export default Header;
