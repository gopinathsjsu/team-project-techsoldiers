import { Amenities } from '@prisma/client';

export interface RoomAmenitiesRequest {
  roomId: number;
  amenities: number[];
}
export interface BookingRequest {
  bookingToDate: Date;
  noOfRooms: number;
  bookingFromDate: Date;
  hotelId: number;
  roomId: number;
  amenities: RoomAmenitiesRequest[];
}
