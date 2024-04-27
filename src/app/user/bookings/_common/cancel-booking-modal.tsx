import { BookingType } from "@/interfaces";
import { CancelBooking } from "@/server-actions/bookings";
import { Modal, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

function CancelBookingModal({
  booking,
  showCancelBookingModal,
  setShowCancelBookingModal,
}: {
  booking: BookingType;
  showCancelBookingModal: boolean;
  setShowCancelBookingModal: (show: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const onCancelBooking = async () => {
    try {
      setLoading(true);
      const response = await CancelBooking({
        bookingId: booking._id,
        paymentId: booking.paymentId,
      });

      if (response.success) {
        setShowCancelBookingModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-red-700 font-bold">ยกเลิกการจอง</div>}
      open={showCancelBookingModal}
      onCancel={() => setShowCancelBookingModal(false)}
      centered
      okText="ใช่, ฉันต้องการยกเลิก"
      onOk={onCancelBooking}
      okButtonProps={{ loading }}
    >
      <div className="text-sm text-gray-600 mb-7">
        <div className="flex justify-between text-sx">
          <span>วันเช็คอิน</span>
          <span>{dayjs(booking.checkInDate).format("MMM DD, YYYY")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>วันเช็คเอาท์</span>
          <span>{dayjs(booking.checkOutDate).format("MMM DD, YYYY")}</span>
        </div>
      </div>

      <span className="text-gray-600 text-sm">
        คุณแน่ใจใช่ไหมที่จะยกเลิกรายการจองนี้
        หากคุณยืนยันแล้วจะไม่สามารถแก้ไขได้
      </span>
    </Modal>
  );
}
export default CancelBookingModal;
