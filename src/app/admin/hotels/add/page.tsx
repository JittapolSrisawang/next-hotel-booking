import PageTitle from "@/components/page-title";
import HotelForm from "../_common/hotel-form";

function AddHotelPage() {
  return (
    <div>
      <PageTitle title="เพิ่มข้อมูลโรงแรม" />
      <HotelForm type="add" />
    </div>
  );
}
export default AddHotelPage;
