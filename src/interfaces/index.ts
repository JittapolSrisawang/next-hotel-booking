export interface UserType {
  _id: string;
  name: string;
  email: string;
  clerkUserId: string;
  profilePic: string;
  isActive: boolean;
  isAdmin: boolean;
  createAt: string;
  updateAt: string;
}

export interface HotelType {
  _id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomType {
  _id: string;
  name: string;
  hotel: HotelType;
  rentPerDay: number;
  type : string;
  roomNumber : number;
  bedrooms : number;
  amenities : string;
  media: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingType {
  _id: string;
  user: UserType;
  room: RoomType;
  hotel: HotelType;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  totalDays : number;
  paymentId : string;
  bookingStatus: 'จองแล้ว' | 'ยกเลิกการจอง' 
  createdAt: string;
  updatedAt: string;
}