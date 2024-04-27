import PageTitle from "@/components/page-title";
import RoomsForm from "../_common/rooms-form";
import HotelModel from "@/models/hotel-model";

async function AddRoomPage() {
  const response = await HotelModel.find();
  const hotels = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="เพิ่มข้อมูลห้องพัก" />

      <RoomsForm hotels={hotels} />
    </div>
  );
}

export default AddRoomPage;
