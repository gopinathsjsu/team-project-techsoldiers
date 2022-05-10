import { PricingType } from '@prisma/client';
import { Pricing } from 'src/models/Pricing';
import { Strategy } from 'src/models/Strategy';
import { DayStrategy } from './strategy/DayStrategy';
import { PricingContext } from './strategy/PricingContext';
import { SeasonStrategy } from './strategy/SeasonStrategy';

export class PricingUtility {
  constructor(private p: Pricing) {}
  createStrategy(pType: PricingType): Strategy {
    let strategy: Strategy = null;
    if (pType.strategyType == 1) {
      strategy = new DayStrategy(pType.DayType, Number(pType.priceFactor));
    } else {
      console.log(new Date(pType.fromDate).toLocaleDateString() + '  : ' + new Date(pType.endDate).toLocaleDateString());
      strategy = new SeasonStrategy(new Date(pType.fromDate), new Date(pType.endDate), Number(pType.priceFactor));
    }
    return strategy;
  }
  calculatePrices(): number[] {
    // eslint-disable-next-line prettier/prettier
    console.log(this.p.startDate.toLocaleDateString() + ' ' + this.p.endDate.toLocaleDateString() + ' ' + this.p.basePrice);
    console.log(this.p.strategies);
    const result: number[] = [];
    //for each day from start to end date, calculate the price and return
    const days = this.calculateDays();
    const currDate = new Date(this.p.startDate);
    const pricingStrategies: PricingContext[] = [];
    for (const strategy of this.p.strategies) {
      pricingStrategies.push(new PricingContext(this.createStrategy(strategy)));
    }

    for (let i = 0; i < days; i++) {
      console.log(currDate.toLocaleDateString());
      //process price for this day
      const prices: number[] = [1];
      for (const context of pricingStrategies) {
        prices.push(context.validateApply(currDate));
      }
      console.log(currDate, ...prices);
      result[i] = Math.max(...prices);
      currDate.setDate(currDate.getDate() + 1);
    }

    return result;
  }
  calculateDays(): number {
    const difference_In_Time = this.p.endDate.getTime() - this.p.startDate.getTime();

    // To calculate the no. of days between two dates
    const days = difference_In_Time / (1000 * 3600 * 24);
    return days;
  }
}
