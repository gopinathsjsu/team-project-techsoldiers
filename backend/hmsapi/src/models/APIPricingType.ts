import { HotelRoom, Prisma } from '@prisma/client';

export type APIPricingType = {
  id: number;
  hotelRoomId: number;
  hotelRoom: HotelRoom;
  strategyType: number;
  fromDate: Date;
  endDate: Date;
  DayType: string;
  priceFactor: Prisma.Decimal;
  name: string;
};
