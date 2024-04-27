"use server";

import { connectMongoDB } from "@/config/db";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import RoomModel from "@/models/room-model";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

connectMongoDB();

export const CheckRoomAvailability = async ({
  roomId,
  reqCheckInDate,
  reqCheckOutDate,
}: {
  roomId: string;
  reqCheckInDate: string;
  reqCheckOutDate: string;
}) => {
  try {
    const bookedSlot = await BookingModel.findOne({
      room: roomId,
      bookingStatus: "จองแล้ว",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    });

    if (bookedSlot) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const BookRoom = async (payload: any) => {
  try {
    const userResponse = await GetCurrentUserFromMongoDB();
    payload.user = userResponse.data._id;
    const booking = new BookingModel(payload);
    await booking.save();
    revalidatePath("/user/bookings");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const CancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    await BookingModel.findByIdAndUpdate(bookingId, {
      bookingStatus: "ยกเลิกการจอง",
    });

    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
    });

    if (refund.status !== "succeeded") {
      return {
        success: false,
        message: "ยกเลิกการจองแล้ว แต่พบปัญหาในการคืนเงิน กรุณาติดต่อผู้ดูแล",
      };
    }

    revalidatePath("/user/bookings");
    return {
      success: true,
      message: "ยกเลิกการจองแล้ว อยู่ในขั้นตอนการคืนเงิน",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const GetAvailableRooms = async ({
  reqCheckInDate,
  reqCheckOutDate,
  type,
}: {
  reqCheckInDate: string;
  reqCheckOutDate: string;
  type: string;
}) => {
  try {
   
    if (!reqCheckInDate || !reqCheckOutDate) {
      const rooms = await RoomModel.find({
        ...(type && { type }),
      }).populate("hotel");
      return {
        success: true,
        data: JSON.parse(JSON.stringify(rooms)),
      };
    }


    const bookedSlots = await BookingModel.find({
      bookingStatus: "จองแล้ว",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    });

    const bookedRoomIds = bookedSlots.map((slot) => slot.room);

    const rooms = await RoomModel.find({
      _id: { $nin: bookedRoomIds },
      ...(type && { type }),
    }).populate("hotel");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(rooms)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
