import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as opencage from 'opencage-api-client';
import { Wildfire } from './models/wildfire.model';
import { GeoComponent } from './models/geo-component.model';
import { Event } from './models/event.model';
import { baseGeoURL } from '../constants';

@Injectable()
export class WildfireService {
  constructor(private readonly httpService: HttpService) {}

  async getWildfires(start: string, end: string): Promise<Wildfire> {
    const urlNasa: string = this.getNasaURL(start, end);
    const wildfires: Wildfire = await (await this.httpService.axiosRef.get(urlNasa)).data;
    console.log('--------->', start, end);
    // for rather than map because is needed to call for Geocode for each wildfire
    // so the easiest way is to mutate directly each event of wildfires response
    for (let i = 0; i < wildfires.events.length; i++) {
      const event: Event = wildfires.events[i];
      const coords: number[] = event.geometry[0].coordinates;
      const countryInfo: GeoComponent | null = await this.getGeocode(coords);
      if (countryInfo) {
        wildfires.events[i]['ISO3166Alpha2'] = countryInfo['ISO_3166-1_alpha-2'];
        wildfires.events[i]['ISO3166Alpha3'] = countryInfo['ISO_3166-1_alpha-3'];
      }
    }
    return wildfires;
  }

  async getWildfiresGQL(start: string, end: string): Promise<Wildfire> {
    const urlNasa: string = this.getNasaURL(start, end);
    const wildfires: Wildfire = await (await this.httpService.axiosRef.get(urlNasa)).data;

    return wildfires;
  }

  /**
   * Leaflet uses lat-lng (or northing-easting) whereas GeoJSON uses lng-lat (or easting-northing)
   * @param coordinate GeoJSON format
   */
  async getGeocode(coords: number[]): Promise<GeoComponent | null> {
    try {
      const data = await opencage.geocode({ q: `${coords[1]},${coords[0]}` });
      if (data.results.length > 0) {
        let { components } = data.results[0];
        components['ISO3166Alpha2'] = components['ISO_3166-1_alpha-2'];
        components['ISO3166Alpha3'] = components['ISO_3166-1_alpha-3'];
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
