import PageTitle from "@/components/page-title";
import UserModel from "@/models/user-model";
import UsersTable from "./_common/users-table";

async function UsersPage() {
  const response = await UserModel.find().sort({ createdAt: -1 });
  const users = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="รายชื่อผู้ใช้" />
      <UsersTable users={users} />
    </div>
  );
}
export default UsersPage;
