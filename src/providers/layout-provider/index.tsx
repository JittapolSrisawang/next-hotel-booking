"use client";

import Header from "./header";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import { usePathname } from "next/navigation";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] = useState<UserType | null>(
    null
  );

  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");
  const isAdminRoute = pathname.includes("/admin");

  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await GetCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data);
        console.log(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedInUserData && !isAuthRoute) {
      getUserData();
    }
  }, []);

  if (isAuthRoute) {
    return children;
  }

  //Prevent users from accessing the Admin page.
  if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
    return (
      <div>
        <Header loggedInUserData={loggedInUserData} />
        <div className="text-center text-sm text-gray-500 py-20 px-5 lg:px-20">
          คุณไม่ได้รับอนุญาตให้เข้าถึงหน้านี้
        </div>
      </div>
    );
  }

  if (loading) {
    return <Spinner fullHeight />;
  }

  return (
    <div>
      <Header loggedInUserData={loggedInUserData} />
      <div className="px-5 lg:px-20 mt-10">{children}</div>
    </div>
  );
}

export default LayoutProvider;
