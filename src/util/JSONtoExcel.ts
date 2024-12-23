import { exportExcelData } from "type/type";
import * as xlsx from "xlsx";

const exportJsonToExcel = <T>(jsonArray: T[], fileName = "output.xlsx") => {
  const worksheet = xlsx.utils.json_to_sheet(jsonArray);

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelData = xlsx.write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelData], { type: "application/octet-stream" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export { exportJsonToExcel };
