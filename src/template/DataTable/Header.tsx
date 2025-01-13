import React, { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const Header = () => {
  const [isHover, setIsHover] = useState(false);
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
      <div
        onMouseEnter={() => {
          setIsHover(!isHover);
        }}
        onMouseLeave={() => {
          setIsHover(!isHover);
        }}
        className="relative w-[15%] border-r-[1px] border-solid border-black"
      >
        <div className="relative flex cursor-pointer border-b-[1px] border-solid border-black text-center">
          <div className="flex w-[100%] items-center justify-center gap-2">
            선택한 이미지들
            <FiAlertCircle size={18} color="green" className="" />
          </div>
        </div>
        {isHover && (
          <div className="h-min-[110px] absolute left-[50%] top-8 z-20 w-[110%] translate-x-[-50%] whitespace-pre-wrap rounded-xl border-[1px] border-red-700 bg-white p-2 text-start">
            {`이미지 선택 시 주의사항!\n\n1.기본적으로 타 사이트의 이미지를 사용하는건 분쟁의 소지가 있음\n\n2. 하지만 외국에 있는 사이트는 분쟁에 걸릴 확률이 한국사이트보다 훨씬 낮음\n\n3.2의 조건에 따라 무조건 외국 사이트에서 가져온 이미지를 사용\n\n4.이미지에 한국사이트 워터마크가 있는것도 주의!\n\n5. 모델샷은 절대 금지 \n\n6.정말 이미지가 없으면 선택 안해도 됨`}
          </div>
        )}
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
