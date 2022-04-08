import { Strategy } from 'src/models/Strategy';

export class DayStrategy implements Strategy {
  days: number[];
  constructor(days: string, private surge: number) {
    this.days = days.split(',').map((e) => parseInt(e));
  }
  doValidation(currDate: Date): number {
    console.log(this.days);
    console.log(currDate.getDay() + ' new date');
    console.log('Checking Day Strategy ');
    return this.days.indexOf(currDate.getDay()) > -1 ? this.surge : 1;
  }
}
