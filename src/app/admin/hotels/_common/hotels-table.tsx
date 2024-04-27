"use client";

import { HotelType } from "@/interfaces";
import { Table, message } from "antd";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DeleteHotel } from "@/server-actions/hotels";
import { useState } from "react";

function HotelsTable({ hotels }: { hotels: HotelType[] }) {
  const router = useRouter();
  const [loading = false, setLoading] = useState<boolean>(false);

  const onDelete = async (hotelId: string) => {
    try {
      setLoading(true);
      const response = await DeleteHotel(hotelId);
      if (response.success) {
        message.success(response.message);
      }
      if (!response.success) {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ชื่อโรงแรม",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ชื่อเข้าของ",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "วันที่เพิ่มข้อมูล",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: HotelType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "ตัวเลือก",
      key: "action",
      render: (text: any, record: HotelType) => (
        <div className="flex gap-5 items-center">
          <Trash2
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => onDelete(record._id)}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/hotels/edit/${record._id}`)}
          />
          <PlusSquare size={18} className="cursor-pointer text-green-700" />
        </div>
      ),
    },
  ];
  return (
    <div>
       <Table loading={loading} dataSource={hotels} columns={columns} />
    </div>
  );
}
export default HotelsTable;
