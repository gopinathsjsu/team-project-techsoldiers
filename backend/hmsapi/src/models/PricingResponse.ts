export interface PricingResponse {
  roomId: number;
  startDate: Date;
  endDate: Date;
  prices: number[];
  finalSurgePrice: number;
  basePrice: number;
  volumePrices?: number[];
  volumePrice?: number;
  finalCartPrice: number;
}
