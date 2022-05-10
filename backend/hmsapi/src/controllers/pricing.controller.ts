import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PricingUtility } from 'src/helpers/pricingutility';
import { PricingAPIInput } from 'src/models/PricingAPIInput';
import { Pricing } from 'src/models/Pricing';
import { PricingResponse } from 'src/models/PricingResponse';
import { PricingService } from 'src/services/pricing.service';
import { HotelRoomService } from 'src/services/hotelroom.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService, private readonly hotelRoomService: HotelRoomService) {}
  @Get('hotelroom/:id/:roomid?')
  async getPrices(@Param('id') hotelId: string, @Param('roomid') roomId: string, @Query() input: PricingAPIInput): Promise<PricingResponse> {
    const pricings = await this.pricingService.pricingforHotel(Number(hotelId), Number(roomId));
    const room = await this.hotelRoomService.hotelRoomsById({
      where: {
        hotelId: Number(hotelId),
        roomId: Number(roomId),
      },
    });
    const startDate: Date = new Date(input.startDate);
    const endDate: Date = new Date(input.endDate);
    const noOfDays = this.calculateDays(startDate, endDate);
    console.log(pricings);
    if (room) {
      const roomCapacityRequest = input.noOfPersons;
      if (pricings.length > 0) {
        return this.processRoom(Number(roomId), room.pricePerRoom, startDate, endDate, pricings, roomCapacityRequest);
      } else {
        const resp: PricingResponse = {
          roomId: Number(roomId),
          prices: [],
          startDate: startDate,
          endDate: endDate,
          finalSurgePrice: Number(room.pricePerRoom) * noOfDays,
          basePrice: Number(room.pricePerRoom),
          finalCartPrice: Number(room.pricePerRoom) * noOfDays,
        };
        if (resp.prices.length == 0) {
          for (let j = 0; j < noOfDays; j++) {
            resp.prices.push(resp.basePrice);
          }
        }
        return resp;
      }
    } else {
      throw new HttpException(
        {
          status: 'Invalid input',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  /*
      {
    id: 2,
    hotelRoomId: 1,
    strategyType: 2,
    fromDate: 2022-05-02T00:00:00.000Z,
    endDate: 2022-05-08T07:00:00.000Z,
    DayType: '',
    priceFactor: 1.75,
    name: 'Summer',
    hotelRoom: {
      id: 1,
      hotelId: 1,
      roomId: 1,
      numberOfRooms: 5,
      pricePerRoom: 50
    }
  }

    */
  @Get('/:id?')
  async getPricesforHotel(@Param('id') hotelId: string, @Query() input: PricingAPIInput): Promise<PricingResponse[]> {
    try {
      console.log('request----------------------', input);
      const pricings = await this.pricingService.pricingforHotelById(Number(hotelId));
      console.log(pricings);
      const rooms = await this.hotelRoomService.hotelRoomsByHotelId({
        where: {
          hotelId: Number(hotelId),
        },
      });
      const startDate: Date = new Date(input.startDate);
      const endDate: Date = new Date(input.endDate);
      const noOfDays = this.calculateDays(startDate, endDate);
      const prices: any = {};
      pricings.forEach((e) => {
        if (prices.hasOwnProperty(e.hotelRoom.roomId)) {
          prices[e.hotelRoom.roomId].push(e);
        } else {
          prices[e.hotelRoom.roomId] = [e];
        }
      });
      const response: PricingResponse[] = [];
      //for each room calculate pricing
      for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const roomCapacityRequest = input.noOfPersons;
        let resp: PricingResponse = {
          roomId: Number(room.roomId),
          prices: [],
          startDate: startDate,
          endDate: endDate,
          finalSurgePrice: Number(room.pricePerRoom) * noOfDays,
          basePrice: Number(room.pricePerRoom),
          finalCartPrice: Number(room.pricePerRoom) * noOfDays,
        };
        if (prices.hasOwnProperty('' + room.roomId)) {
          if (prices[room.roomId + ''].length > 0) {
            //if zero create single object
            resp = this.processRoom(room.roomId, prices[room.roomId + ''][0].hotelRoom.pricePerRoom, startDate, endDate, prices[room.roomId + ''], roomCapacityRequest);
          }
        }
        if (resp.prices.length == 0) {
          for (let j = 0; j < noOfDays; j++) {
            resp.prices.push(resp.basePrice);
          }
        }
        response.push(resp);
      }
      return response;
    } catch (err) {
      throw new HttpException(
        {
          status: 'Invalid input',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  processRoom(roomId, basePrice, startDate, endDate, strategies, noOfPersons): PricingResponse {
    const pricing: Pricing = {
      basePrice: basePrice,
      startDate: startDate,
      endDate: endDate,
      strategies: strategies,
    };
    const p: PricingUtility = new PricingUtility(pricing);
    let finalPrice = 0;
    const prices = p.calculatePrices();
    const dayPrices = [];
    for (const price of prices) {
      dayPrices.push(basePrice * price);
      finalPrice += basePrice * price;
    }
    const resp: PricingResponse = {
      roomId: roomId,
      prices: dayPrices,
      startDate: startDate,
      endDate: endDate,
      finalSurgePrice: finalPrice,
      basePrice: basePrice,
      finalCartPrice: finalPrice,
    };
    const noOfDays = this.calculateDays(startDate, endDate);
    if (resp.prices.length == 0) {
      for (let j = 0; j < noOfDays; j++) {
        resp.prices.push(resp.basePrice);
      }
    }
    return resp;
  }
  calculateDays(startDate: Date, endDate: Date): number {
    const difference_In_Time = endDate.getTime() - startDate.getTime();

    // To calculate the no. of days between two dates
    const days = difference_In_Time / (1000 * 3600 * 24);
    return days;
  }
}
