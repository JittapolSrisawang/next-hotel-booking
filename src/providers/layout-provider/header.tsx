import { UserType } from "@/interfaces";
import ProjectTitle from "./project-title";
import { Button } from "antd";
import UserInfo from "./user-info";

function Header({ loggedInUserData }: { loggedInUserData: UserType | null }) {
  if (!loggedInUserData) {
    return (
      <div className="flex justify-between items-center">
        <ProjectTitle />
        <Button type="link">ลงชื่อเข้าใช้</Button>
      </div>
    );
  }

  return (
    <div className="lg:px-20">
      <div className="flex justify-between items-center bg-black text-white">
        <ProjectTitle />
        <UserInfo loggedInUserData={loggedInUserData} />
      </div>
    </div>
  );
}
export default Header;
