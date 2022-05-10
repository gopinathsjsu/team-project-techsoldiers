import { Booking, BookingRoomAmenities, Hotel } from '@prisma/client';

export interface BookingDTO extends Booking {
  hotel: Hotel;
  bookingRoomAmenities: BookingRoomAmenities[];
}
