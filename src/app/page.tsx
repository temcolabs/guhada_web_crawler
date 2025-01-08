import { Metadata } from "next";
import Head from "next/head";
import UploadFile from "template/main/UploadFile";

export const metadata: Metadata = {
  title: {
    absolute: "파일 업로드해주세용",
  },
};

export default function Home() {
  return (
    <>
      <UploadFile />;
    </>
  );
}
