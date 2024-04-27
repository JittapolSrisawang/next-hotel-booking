import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import HotelModel from "@/models/hotel-model";
import HotelsTable from "./_common/hotels-table";

async function HotelPage() {
  const response = await HotelModel.find().sort({ createdAt: -1 });
  const hotels = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="โรงแรม" />
        <LinkButton title="เพิ่มข้อมูลโรงแรม" path="/admin/hotels/add" />
      </div>

      <HotelsTable hotels={hotels} />
    </div>
  );
}
export default HotelPage;
