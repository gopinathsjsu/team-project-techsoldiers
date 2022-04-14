import { Strategy } from 'src/models/Strategy';
import * as moment from 'moment';
export class SeasonStrategy implements Strategy {
  constructor(
    private startDate: Date,
    private endDate: Date,
    private surge: number,
  ) {
    console.log(startDate);
    console.log(endDate);
  }
  doValidation(currDate: Date): number {
    console.log('Checking Season Strategy ');

    return currDate.getTime() >= this.startDate.getTime() &&
      currDate.getTime() <= this.endDate.getTime()
      ? this.surge
      : 1;
  }
}
