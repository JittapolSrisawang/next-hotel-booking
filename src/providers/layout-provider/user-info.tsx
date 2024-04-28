import { UserType } from "@/interfaces";
import { User } from "lucide-react";
import Sidebar from "./sidebar";
import { useState } from "react";

function UserInfo({ loggedInUserData }: { loggedInUserData: UserType }) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="p-5 border-0 lg:border-l border-solid flex items-center gap-5">
      <span className="text-gray-200 text-sm">{loggedInUserData.name}</span>
      <User
        className="text-gray-200"
        onClick={() => setShowSidebar(!showSidebar)}
      />

      {showSidebar && (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}
        loggedInUserData={loggedInUserData}
        />
      )}
    </div>
  );
}
export default UserInfo;
