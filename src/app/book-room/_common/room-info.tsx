import { RoomType } from "@/interfaces";
import { Image } from "antd";

function RoomInfo({ room }: { room: RoomType }) {
  const renderRoomProperty = (label: string, value: string) => {
    return (
      <div className="flex flex-col  text-gray-600">
        <span className="text-xs">{label}</span>
        <span className="text-sm font-semibold"> {value}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-7">
        {room.media.map((media, index) => (
          <Image
            src={media}
            key={index}
            width={200}
            height={170}
            className="rounded-lg"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-7 capitalize">
        {renderRoomProperty("ชื่อห้องพัก", room.name)}
        {renderRoomProperty("ประเภทห้องพัก", room.type)}
        {renderRoomProperty("หมายเลขห้องพัก", room.roomNumber.toString())}
        {renderRoomProperty("ราคา/วัน", room.rentPerDay.toString())}
        {renderRoomProperty("ห้องนอน", room.bedrooms.toString())}
        {renderRoomProperty("เจ้าของห้องพัก", room.hotel.owner)}
        {renderRoomProperty("อีเมล", room.hotel.email)}
        {renderRoomProperty("โทรศัพท์", room.hotel.phone)}
      </div>

      <div className="mt-7">
      <span className="text-xs">สิ่งอำนวยความสะดวก</span>
        <div className="flex flex-wrap gap-7 mt-2">
          {room.amenities.split(",").map((amenity, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-600 rounded-md px-3 py-1 text-xs capitalize"
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;
