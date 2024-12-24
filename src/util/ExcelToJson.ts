import * as xlsx from "xlsx";

export const parsingExcelToJSON = async <T>(file?: File): Promise<T[]> => {
  // 2. Read the file as an ArrayBuffer
  if (file) {
    const buffer = await file.arrayBuffer();

    // 3. Parse the Excel file using `xlsx`
    const workbook = xlsx.read(buffer, { type: "buffer" });

    // 4. Convert the first sheet to JSON
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json<T>(workbook.Sheets[sheetName]);
    return jsonData;
  } else {
    return [];
  }
};
