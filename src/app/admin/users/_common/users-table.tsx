"use client";

import { UserType } from "@/interfaces";
import { UpdateUserRole } from "@/server-actions/users";
import { Table, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

function UsersTable({ users }: { users: UserType[] }) {
  const [loading, setLoading] = useState(false);

  const onRoleChange = async (userId: string, isAdmin: boolean) => {
    try {
      setLoading(true);
      const response = await UpdateUserRole(userId, isAdmin);
      if (response.success) {
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

  const columns = [
    {
      title: "ชื่อผู้ใช้",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ID ผู้ใช้",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "วันที่เข้าร่วม",
      dataIndex: "createdAt",
      render: (value: string) => dayjs(value).format("MMM DD, YYYY hh:mm A"),
      key: "createdAt",
    },
    {
      title: "บทบาท",
      dataIndex: "isAdmin",
      render: (isAdmin: boolean, user: UserType) => (
        <select
          className="border border-gray-300 py-3 px-7"
          onChange={(e) => onRoleChange(user._id, e.target.value === "admin")}
        >
          <option value="admin" selected={isAdmin}>
            Admin
          </option>
          <option value="user" selected={!isAdmin}>
            User
          </option>
        </select>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={users} columns={columns} loading={loading} />
    </div>
  );
}

export default UsersTable;
