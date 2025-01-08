import { Metadata } from "next";
import DataTable from "template/DataTable/DataTable";

export const metadata: Metadata = {
  title: {
    absolute: "크롤링 스트림 버튼을 눌러주세요!",
  },
};
const page = () => {
  return <DataTable />;
};

export default page;
