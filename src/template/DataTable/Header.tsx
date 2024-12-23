import React from "react";

const Header = () => {
  return (
    <div className="sticky top-[0px] z-[100] flex bg-white">
      <div className="flex border-t-[1px] border-solid border-black">
        <div className="w-[51px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            index
          </div>
        </div>
        <div className="w-[100px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            uniqueindex
          </div>
        </div>
        <div className="w-[80px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            브랜드
          </div>
        </div>
        <div className="w-[120px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            모델명
          </div>
        </div>

        <div className="w-[150px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            상품명
          </div>
        </div>
        <div className="w-[601px] border-r-[1px] border-solid border-black">
          <div className="flex justify-center border-b-[1px] border-solid border-black">
            사진
          </div>
        </div>
      </div>
      <div className="sticky top-[20px] z-[100] flex border-t-[1px] border-solid border-black bg-white">
        <div className="w-[50px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            index
          </div>
        </div>
        <div className="w-[503px] border-r-[1px] border-solid border-black">
          <div className="flex justify-center border-b-[1px] border-solid border-black">
            사진
          </div>
        </div>
        <div className="w-[120px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            직접입력
          </div>
        </div>
        {/* <div className="w-[100px] border-r-[1px] border-solid border-black">
          <div className="border-b-[1px] border-solid border-black text-center">
            못찾겠어요
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
