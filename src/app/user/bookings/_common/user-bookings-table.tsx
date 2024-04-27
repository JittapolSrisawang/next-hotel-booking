"use client";
import { BookingType } from "@/interfaces";
import { Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import CancelBookingModal from "./cancel-booking-modal";

function UserBookingsTable({ bookings }: { bookings: BookingType[] }) {
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(
    null
  );

  const onCancel = async (booking: BookingType) => {
    setSelectedBooking(booking);
    setShowCancelBookingModal(true);
  };

  const columns = [
    {
      title: "โรงแรม",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: string, record: BookingType) => record.hotel.name,
    },
    {
      title: "ห้องพัก",
      dataIndex: "room",
      key: "room",
      render: (text: string, record: BookingType) => record.room.name,
    },
    {
      title: "หมายเลขห้องพัก",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text: string, record: BookingType) => record.room.roomNumber,
    },
    {
      title: "วันเช็คอิน",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (text: string, record: BookingType) =>
        dayjs(record.checkInDate).format("MMM DD, YYYY"),
    },
    {
      title: "วันเช็คเอาท์",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (text: string, record: BookingType) =>
        dayjs(record.checkOutDate).format("MMM DD, YYYY"),
    },
    {
      title: "ยอดเงินทั้งหมด",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: string, record: BookingType) => record.totalAmount,
    },
    {
      title: "วันที่ทำรายการ",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string, record: BookingType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "สถานะ",
      dataIndex: "bookingStatus",
      key: "status",
    },
    {
      title: "ตัวเลือก",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: BookingType) => 
        record.bookingStatus === "จองแล้ว" && (
        <span
          className="text-red-500 cursor-pointer text-sm"
          onClick={() => onCancel(record)}
        >
          ยกเลิก
        </span>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={bookings} columns={columns} />

      {showCancelBookingModal && selectedBooking && (
        <CancelBookingModal
          showCancelBookingModal={showCancelBookingModal}
          setShowCancelBookingModal={setShowCancelBookingModal}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}
export default UserBookingsTable;
