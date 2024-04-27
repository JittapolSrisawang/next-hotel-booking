"use client";

import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { AddHotel, EditHotel } from "@/server-actions/hotels";
import { Button, Form, Input, Upload, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

function HotelForm({
  type = "add",
  initialData,
}: {
  type: string;
  initialData?: any;
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
        response = await AddHotel(values);
      } else {
        response = await EditHotel({
          hotelId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/hotels");
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
        name="name"
        className="col-span-3"
        rules={[{ required: true, message: "กรุณาใส่ชื่อโรงแรม" }]}
      >
        <Input placeholder="ชื่อโรงแรม" />
      </Form.Item>

      <Form.Item
        label="ชื่อเจ้าของ"
        name="owner"
        className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "กรุณาใส่ชื่อเจ้าของ" }]}
      >
        <Input placeholder="ชื่อเจ้าของ" />
      </Form.Item>

      <Form.Item
        label="อีเมล"
        name="email"
        className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "กรุณาใส่อีเมล" }]}
      >
        <Input placeholder="อีเมล" />
      </Form.Item>

      <Form.Item
        label="โทรศัพท์"
        name="phone"
        className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "กรุณาใส่หมายเลขโทรศัพท์" }]}
      >
        <Input placeholder="โทรศัพท์" />
      </Form.Item>

      <Form.Item
        label="ที่อยู่"
        name="address"
        className="col-span-3"
        rules={[{ required: true, message: "กรุณาใส่ที่อยู่" }]}
      >
        <Input.TextArea placeholder="ที่อยู่" />
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
            setupUploadedFiles([...uploadedFiles, file]);
            return false;
          }}
          multiple
        >
          <span className="text-xs text-gray-500 p-3">อัปโหลดรูปภาพ</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading} onClick={() => router.push("/admin/hotels")}>
          ยกเลิก
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
        </Button>
      </div>
    </Form>
  );
}
export default HotelForm;
