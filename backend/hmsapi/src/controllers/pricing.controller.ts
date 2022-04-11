import { Controller, Get, Param, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PricingUtility } from 'src/helpers/pricingutility';
import { APIDateRange } from 'src/models/APIDateRange';
import { Pricing } from 'src/models/Pricing';
import { PricingResponse } from 'src/models/PricingResponse';
import { PricingService } from 'src/services/pricing.service';
const userPosts: Prisma.PricingTypeInclude = {
  hotelRoom: true,
};
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}
  @Get()
  async getPrices(): Promise<number[]> {
    const pricings = await this.pricingService.pricingforHotel(1, 1);
    console.log(pricings);
    const startDate: Date = new Date();
    const endDate: Date = new Date();
    endDate.setDate(endDate.getDate() + 5);
    const pricing: Pricing = {
      basePrice: 250,
      startDate: startDate,
      endDate: endDate,
      strategies: pricings,
    };
    const p: PricingUtility = new PricingUtility(pricing);
    return p.calculatePrices();
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
  async getPricesforHotel(
    @Param('id') hotelId: string,
    @Query() dateRange: APIDateRange,
  ): Promise<PricingResponse[]> {
    console.log('request----------------------', dateRange);
    const pricings = await this.pricingService.pricingforHotelById(
      Number(hotelId),
    );
    console.log(pricings);
    const response: PricingResponse[] = [];

    const prices: any = {};
    pricings.forEach((e) => {
      if (prices.hasOwnProperty(e.hotelRoom.roomId)) {
        prices[e.hotelRoom.roomId].push(e);
      } else {
        prices[e.hotelRoom.roomId] = [e];
      }
    });
    const startDate: Date = new Date(dateRange.startDate);
    const endDate: Date = new Date(dateRange.endDate);
    Object.keys(prices).forEach((e) => {
      console.log('result', prices[e]);
      const pricing: Pricing = {
        basePrice: 250,
        startDate: startDate,
        endDate: endDate,
        strategies: prices[e],
      };

      const p: PricingUtility = new PricingUtility(pricing);
      const resp: PricingResponse = {
        roomId: Number(e),
        prices: p.calculatePrices(),
        startDate: startDate,
        endDate: endDate,
      };
      response.push(resp);
    });
    return response;
  }
}
