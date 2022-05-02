import { HotelRoom, Prisma, Room } from '@prisma/client';

export interface HotelRoomDTO {
  id: number;
  hotelId: number;
  roomId: number;
  room: Room;
  numberOfRooms: number;
  pricePerRoom: Prisma.Decimal;
}
export interface HotelRoomDetails {
  id: number;
  hotelId: number;
  roomId: number;
  room: Room;
  numberOfRooms: number;
  pricePerRoom: Prisma.Decimal;
  currentAvailablity: number;
}
