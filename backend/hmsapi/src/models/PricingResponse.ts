export interface PricingResponse {
  roomId: number;
  startDate: Date;
  endDate: Date;
  prices: number[];
  finalPrice: number;
}
