import { UserType } from "@/interfaces";
import { Drawer } from "antd";
import {
  BedDouble,
  LineChart,
  Home,
  Hotel,
  List,
  User,
  LogIn,
  User2,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Dispatch, SetStateAction } from "react";

function Sidebar({
  showSidebar,
  setShowSidebar,
  loggedInUserData,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {
  const iconSize = 18;
  const router = useRouter();
  const pathname = usePathname();

  const { signOut } = useAuth();

  const onLogout = async () => {
    await signOut();
    setShowSidebar(false);
    router.push("/sign-in");
  };

  const userMenuItems: any[] = [
    {
      name: "หน้าหลัก",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "รายการจองที่พัก",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "โปรไฟล์",
      icon: <User size={iconSize} />,
      onClick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];
  const adminMenuItems: any[] = [
    {
      name: "หน้าหลัก",
      icon: <Home size={iconSize} />,
      onClick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "รายการจองที่พัก",
      icon: <List size={iconSize} />,
      onClick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "โรงแรม",
      icon: <Hotel size={iconSize} />,
      onClick: () => router.push("/admin/hotels"),
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "ห้องพัก",
      icon: <BedDouble size={iconSize} />,
      onClick: () => router.push("/admin/rooms"),
      isActive: pathname.includes("/admin/rooms"),
    },
    {
      name: "รายชื่อผู้ใช้",
      icon: <User2 size={iconSize} />,
      onClick: () => router.push("/admin/users"),
      isActive: pathname.includes("/admin/users"),
    },
    {
      name: "รายงาน",
      icon: <LineChart size={iconSize} />,
      onClick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ];

  const menuItemsToShow: any[] = loggedInUserData.isAdmin
    ? adminMenuItems
    : userMenuItems;

  return (
    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closable>
      <div className="flex flex-col gap-10">
        {menuItemsToShow.map((item, index) => (
          <div
            className={`flex gap-4 items-center text-gray-700 cursor-pointer px-7 py-3 rounded ${
              item.isActive ? "bg-gray-700 text-white" : ""
            }`}
            key={index}
            onClick={() => {
              item.onClick();
              setShowSidebar(false);
            }}
          >
            {item.icon}
            <span className="mt-[2px]">{item.name}</span>
          </div>
        ))}

        <span
          className="text-center cursor-pointer text-red-500"
          onClick={onLogout}
        >
          ออกจากระบบ
        </span>
      </div>
    </Drawer>
  );
}
export default Sidebar;
