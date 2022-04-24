import { PricingResponse } from 'src/models/PricingResponse';

export class PricingPostProcessor {
  updatePricing(roomCapacity, roomCapacityRequest, pricing: PricingResponse): PricingResponse {
    if (roomCapacity < roomCapacityRequest) {
      let newprice = 0;
      const extra = roomCapacityRequest - roomCapacity;
      for (let i = 0; i < pricing.prices.length; i++) {
        newprice += pricing.prices[i] + extra * pricing.basePrice;
      }
      pricing.volumePrice = newprice;
    }
    return pricing;
  }
}
