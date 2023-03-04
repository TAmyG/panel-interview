import { monthConfig as mc } from '../../constants';

export class UtilHelper {
  private _month: string;
  private _year: string;
  /**
   * Constructor cleans month and ensure if year is number
   * Error handling, default values for month =  01 and year = 2022. Extracted from constants
   * @param month format MMM
   * @param year format YYYY
   */
  constructor(month: string, year: string) {
    try {
      this._month = month
        .toUpperCase()
        .trim()
        .replace(/[^a-zA-Z0-9 ]/g, '');
      this._year = Number.isInteger(parseInt(year, 2)) ? year : mc.DEFAULT_YEAR;
    } catch (error) {
      console.log('DataHelper-Constructor', error);
      this._month = mc.DEFAULT_MONTH;
      this._year = mc.DEFAULT_YEAR;
    }
  }

  /**
   * Format of dates returned YYYY-MM-DD
   * By default Febraury has 28 days
   * @returns string[2], [0]=startDate and [1]=finalDate.
   */
  public getStartEndDate(): string[] {
    try {
      if (!(this._month in mc.MONTHS)) {
        return [
          `${mc.DEFAULT_YEAR}-${mc.DEFAULT_MONTH}-01`,
          `${mc.DEFAULT_YEAR}-${mc.DEFAULT_MONTH}-31`,
        ];
      }
      const { days, code } = mc.MONTHS[this._month];

      return [`${this._year}-${code}-01`, `${this._year}-${code}-${days}`];
    } catch (error) {
      console.log(error);
      return [
        `${mc.DEFAULT_YEAR}-${mc.DEFAULT_MONTH}-01`,
        `${mc.DEFAULT_YEAR}-${mc.DEFAULT_MONTH}-31`,
      ];
    }
  }
}
