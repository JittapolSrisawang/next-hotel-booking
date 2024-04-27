import { RoomType } from "@/interfaces";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { Button, Modal, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookRoom } from "@/server-actions/bookings";

function PaymentModal({
  room,
  totalDays,
  totalAmount,
  checkInDate,
  checkOutDate,
  showPaymentModal,
  setShowPaymentModal,
}: {
  room: RoomType;
  totalDays: number;
  totalAmount: number;
  checkInDate: string;
  checkOutDate: string;
  showPaymentModal: boolean;
  setShowPaymentModal: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("ชำระเงินสำเร็จ");
        const bookingPayload = {
          hotel: room.hotel._id,
          room: room._id,
          checkInDate,
          checkOutDate,
          totalAmount,
          totalDays,
          paymentId: result.paymentIntent.id,
        };
        await BookRoom(bookingPayload);
        message.success("การจองห้องพักสำเร็จ");
        setShowPaymentModal(false);
        router.push("/user/bookings");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showPaymentModal}
      title="ชำระเงิน"
      onCancel={() => setShowPaymentModal(false)}
      footer={null}
    >
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{
              mode: "billing",
              allowedCountries: ["TH"],
            }}
          />

          <div className="flex justify-end gap-5 mt-7">
            <Button
              disabled={loading}
              onClick={() => setShowPaymentModal(false)}
            >
              ยกเลิก
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              ชำระเงิน {totalAmount} บาท
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export default PaymentModal;
