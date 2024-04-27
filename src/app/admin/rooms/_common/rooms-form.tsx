"use client";

import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HotelType } from "@/interfaces";
import {AddRoom, EditRoom} from "@/server-actions/rooms"

function RoomsForm({
  type = "add",
  initialData,
  hotels,
}: {
  type?: string;
  initialData?: any;
  hotels: HotelType[];
}) {
  const [uploadedFiles, setupUploadedFiles] = useState([]) as any[];
  const [existingMedia = [], setExistingMedia] = useState(
    initialData?.media || []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];
      let response: any = null;
      if (type === "add") {
        response = await AddRoom(values);
      } else {
        response = await EditRoom({
          roomId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/rooms");
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

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-3 mt-5 gap-5"
      onFinish={onFinish}
      initialValues={initialData}
    >
      <Form.Item
        label="ชื่อโรงแรม"
        name="hotel"
        rules={[{ required: true, message: "กรุณาใส่ชื่อโรงแรม" }]}
      >
        <Select>
          {hotels.map((hotel) => (
            <Select.Option key={hotel._id} value={hotel._id}>
              {hotel.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="ชื่อห้องพัก"
        name="name"
        rules={[{ required: true, message: "กรุณาใส่ชื่อห้องพัก" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="หมายเลขห้องพัก"
        name="roomNumber"
        rules={[{ required: true, message: "กรุณาใส่หมายเลขห้องพัก" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ประเภทห้องพัก"
        name="type"
        rules={[{ required: true, message: "กรุณาใส่ประเภทห้องพัก" }]}
      >
        <Select>
          <Select.Option key="delux" value="delux">
            Delux
          </Select.Option>
          <Select.Option key="premium" value="premium">
            Premium
          </Select.Option>
          <Select.Option key="standard" value="standard">
            Standard
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="ห้องนอน"
        name="bedrooms"
        rules={[{ required: true, message: "กรุณาใส่จำนวนห้องนอน" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ราคาต่อวัน"
        name="rentPerDay"
        rules={[{ required: true, message: "กรุณาใส่ราคาต่อวัน" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="สิ่งอำนวนความสะดวก"
        name="amenities"
        rules={[{ required: true, message: "กรุณาใส่สิ่งอำนวยความสะดวก" }]}
        className="col-span-3"
      >
        <Input.TextArea />
      </Form.Item>

      <div className="col-span-3 flex gap-5">
        <div className="flex gap-5">
          {existingMedia.map((media: any, index: number) => (
            <div
              className="flex flex-col border border-solid rounded p-3 border-gray-200 gap-5 items-center"
              key={index}
            >
              <img src={media} alt="media" className="h-16 w-16 object-cover" />
              <span
                className="text-gray-500 underline text-sm cursor-pointer"
                onClick={() => {
                  setExistingMedia(
                    existingMedia.filter(
                      (item: string, i: number) => i !== index
                    )
                  );
                }}
              >
                ลบ
              </span>
            </div>
          ))}
        </div>

        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setupUploadedFiles((prev: any) => [...prev, file]);
            return false;
          }}
          multiple
        >
          <span className="text-xs text-gray-500 p-3">อัปโหลดรูปภาพ</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading} onClick={() => router.push("/admin/rooms")}>
          ยกเลิก
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
        </Button>
      </div>
    </Form>
  );
}

export default RoomsForm;
