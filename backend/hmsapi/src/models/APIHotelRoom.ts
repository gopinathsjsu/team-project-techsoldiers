import { HotelRoom, Room } from '@prisma/client';

export interface APIHotelRoom extends HotelRoom {
  room: Room;
}
