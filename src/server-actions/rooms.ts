"use server";

import { connectMongoDB } from "@/config/db";
import RoomModel from "@/models/room-model";
import { revalidatePath } from "next/cache";
connectMongoDB();

export const AddRoom = async (payload: any) => {
  try {
    const newHotel = new RoomModel(payload);
    await newHotel.save();
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "เพิ่มข้อมูลห้องพักสำเร็จ",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const EditRoom = async ({
  roomId,
  payload,
}: {
  roomId: string;
  payload: any;
}) => {
  try {
    await RoomModel.findByIdAndUpdate(roomId, payload);
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "แก้ไขข้อมูลห้องพักสำเร็จ",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const DeleteRoom = async (roomId: string) => {
  try {
    await RoomModel.findByIdAndDelete(roomId);
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "ลบข้อมูลห้องพักสำเร็จ",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
