import { useState, useEffect } from "react";
import { getData } from "./api/fetchData";
import PointOfSale from "@/components/pos";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";

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
    <div className="app">
      <Link className="logo" href="/">
        <Image width={100} alt="logo" src={Logo} />
      </Link>
      <PointOfSale prods={sheetData} />
    </div>
  );
}
