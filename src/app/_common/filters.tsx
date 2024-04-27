"use client";

import { Button } from "antd";
import { FilterX, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Filters({ searchParams }: { searchParams: any }) {
  const [checkIn, setCheckIn] = useState(searchParams.checkIn || "");
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || "");
  const [type, setType] = useState(searchParams.type || "");
  const router = useRouter();

  const onSearch = () => {
    const newSearchParamsObject = { ...searchParams, checkIn, checkOut, type };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/?${newSearchParams}`);
  };

  const onClear = () => {
    setCheckIn("");
    setCheckOut("");
    setType("");
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7 items-end">
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">วันเช็คอิน</span>
        <input
          placeholder="Check-in"
          className="h-14 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">วันเช็คเอาท์</span>
        <input
          placeholder="Check-out"
          className="h-14 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">ประเภทห้องพัก</span>
        <select
          className="h-14 px-10 w-full bg-gray-200 border-gray-200 border-solid border outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="delux">Delux</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
        </select>
      </div>

      <div className="flex gap-5">
        <Button
          icon={<FilterX size={20} />}
          className="h-14 px-10 flex items-center"
          onClick={onClear}
        >
          ลบคำค้นหา
        </Button>
        <Button
          className="h-14 px-10 flex items-center"
          type="primary"
          icon={<Search size={20} />}
          onClick={onSearch}
        >
          ค้นหา
        </Button>
      </div>
    </div>
  );
}

export default Filters;
