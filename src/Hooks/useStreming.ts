import { useEffect, useState } from "react";
import { excelType } from "type/type";

type useStremingParams = {
  api: string;
  excelData: excelType[];
};
const useStreming = <T>({ api }: useStremingParams) => {
  const [data, setData] = useState<T[]>([]);
  const [isStreamEnded, setIsStreamEnded] = useState(false);
  useEffect(() => {
    const eventSource = new EventSource(api);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.status === "end") {
        eventSource.close();
        setIsStreamEnded(true); // Mark the stream as ended
      } else {
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
  }, []);

  return { data, isStreamEnded };
};

export default useStreming;
