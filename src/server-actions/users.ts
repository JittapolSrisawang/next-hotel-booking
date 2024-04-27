"use server";

import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const GetCurrentUserFromMongoDB = async () => {
  try {
    const currentUserfromClerk = await currentUser();

    const user = await UserModel.findOne({
      clerkUserId: currentUserfromClerk?.id,
    });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    const newUser = new UserModel({
      name:
        currentUserfromClerk?.firstName + " " + currentUserfromClerk?.lastName,
      clerkUserId: currentUserfromClerk?.id,
      email: currentUserfromClerk?.emailAddresses[0].emailAddress,
      profilePic: currentUserfromClerk?.imageUrl,
      isAdmin: false,
      isActive: true,
    });

    await newUser.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "Error while fetching user data from MongoDB",
    };
  }
};

export const UpdateUserRole = async (userId: string, isAdmin: boolean) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "ไม่พบชื่อผู้ใช้",
      };
    }
    user.isAdmin = isAdmin;
    await user.save();
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "อัปเดตบทบาทผู้ใช้สำเร็จแล้ว",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "เกิดข้อผิดพลาดขณะอัปเดตบทบาทของผู้ใช้",
    };
  }
}