import { PricingType } from '@prisma/client';

export interface Pricing {
  startDate: Date;
  endDate: Date;
  basePrice: number;
  strategies: PricingType[];
}
