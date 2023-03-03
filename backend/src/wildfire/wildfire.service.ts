import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IEvent, IGeoComponent, IWildfire } from './IWildfire-response';
import * as opencage from 'opencage-api-client';

@Injectable()
export class WildfireService {
  constructor(private readonly httpService: HttpService) {}

  async getWildfires(
    month: string = '1',
    year: string = '2022',
  ): Promise<IWildfire> {
    const urlNasa: string = this.getNasaURL(month, year);
    const wildfires: IWildfire = await (
      await this.httpService.axiosRef.get(urlNasa)
    ).data;

    // for rather than map because is needed to call for Geocode for each wildfire
    // so the easiest way is to mutate directly each event of wildfires response
    for (let i = 0; i < wildfires.events.length; i++) {
      const event: IEvent = wildfires.events[i];
      const coords: number[] = event.geometry[0].coordinates;
      const countryInfo: IGeoComponent | null = await this.getGeocode(coords);
      if (countryInfo) {
        wildfires.events[i]['ISO_3166-1_alpha-3'] =
          countryInfo['ISO_3166-1_alpha-3'];
      }
    }
    return wildfires;
  }

  /**
   * Leaflet uses lat-lng (or northing-easting) whereas GeoJSON uses lng-lat (or easting-northing)
   * @param coordinate GeoJSON format
   */
  private async getGeocode(coords: number[]) {
    try {
      const data = await opencage.geocode({ q: `${coords[1]},${coords[0]}` });
      if (data.results.length > 0) {
        const { components } = data.results[0];
        return components;
      }
      console.log('status', data.status.message);
      console.log('total_results', data.total_results);
      return null;
    } catch (error) {
      console.log('getCountryFromLatLong ERROR: ', error);
      return null;
    }
  }

  private getNasaURL(month: string, year: string): string {
    const startDate: string = `${year}-${month}-01`;
    const endDate: string =
      month == '02' ? `${year}-${month}-28` : `${year}-${month}-31`;
    const cat: string = 'wildfires';
    const stat: string = 'open';
    return `https://eonet.gsfc.nasa.gov/api/v3/events?category=${cat}&status=${stat}&start=${startDate}&end=${endDate}`;
  }
}
