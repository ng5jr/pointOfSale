import { useState, useEffect } from "react";
import { getData } from "./api/fetchData";
import PointOfSale from "@/components/pos";

export default function Home() {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setSheetData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Google Sheets Data</h1>
      <PointOfSale prods={sheetData} />
    </div>
  );
}
