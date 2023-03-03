import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IEvent, IGeoComponent, IWildfire } from './interface/IWildfire-response';
import * as opencage from 'opencage-api-client';
import { baseGeoURL } from 'src/constants';

@Injectable()
export class WildfireService {
  constructor(private readonly httpService: HttpService) {}

  async getWildfires(start: string, end: string): Promise<IWildfire> {
    const urlNasa: string = this.getNasaURL(start, end);
    const wildfires: IWildfire = await (await this.httpService.axiosRef.get(urlNasa)).data;

    // for rather than map because is needed to call for Geocode for each wildfire
    // so the easiest way is to mutate directly each event of wildfires response
    for (let i = 0; i < wildfires.events.length; i++) {
      const event: IEvent = wildfires.events[i];
      const coords: number[] = event.geometry[0].coordinates;
      const countryInfo: IGeoComponent | null = await this.getGeocode(coords);
      if (countryInfo) {
        wildfires.events[i]['ISO_3166-1_alpha-3'] = countryInfo['ISO_3166-1_alpha-3'];
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

  private getNasaURL(start: string, end: string): string {
    const cat: string = 'wildfires';
    const stat: string = 'open';
    return `${baseGeoURL}/events?category=${cat}&status=${stat}&start=${start}&end=${end}`;
  }
}
