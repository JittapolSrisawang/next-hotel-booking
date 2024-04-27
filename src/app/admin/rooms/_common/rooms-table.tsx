"use client";

import { RoomType } from "@/interfaces";
import { Table, message } from "antd";
import { Edit, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DeleteRoom } from "@/server-actions/rooms";
import { useState } from "react";

function RoomsTable({ rooms }: { rooms: RoomType[] }) {
  const router = useRouter();
  const [loading = false, setLoading] = useState<boolean>(false);

  const onDelete = async (roomId: string) => {
    try {
      setLoading(true);
      const response = await DeleteRoom(roomId);
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
      title: "ชื่อห้องพัก",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ชื่อโรงแรม",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: any, record: RoomType) => record.hotel.name,
    },
    {
      title: "หมายเลขห้องพัก",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "ประเภทห้องพัก",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "ราคาต่อวัน",
      dataIndex: "rentPerDay",
      key: "rentPerDay",
    },
    {
      title: "วันที่เพิ่มข้อมูล",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: RoomType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "ตัวเลือก",
      key: "action",
      render: (text: any, record: RoomType) => (
        <div className="flex gap-5 items-center">
          <Trash2
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => onDelete(record._id)}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/rooms/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table loading={loading} dataSource={rooms} columns={columns} />
    </div>
  );
}
export default RoomsTable;
