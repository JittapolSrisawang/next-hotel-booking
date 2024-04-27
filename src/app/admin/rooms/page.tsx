import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import RoomModel from "@/models/room-model";
import RoomsTable from "./_common/rooms-table";

async function RoomsPage() {
  const response = await RoomModel.find()
    .populate("hotel")
    .sort({ createdAt: -1 });
  const rooms = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="ห้องพัก" />
        <LinkButton path="/admin/rooms/add" title="เพิ่มข้อมูลห้องพัก" />
      </div>

      <RoomsTable rooms={rooms} />
    </div>
  );
}
export default RoomsPage;
