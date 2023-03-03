export interface IWildfire {
  title: string;
  description: string;
  link: string;
  events: IEvent[];
}

export interface IEvent {
  'ISO_3166-1_alpha-3'?: string;
  id: string;
  title: string;
  description: string;
  link: string;
  closed: string;
  categories: [
    {
      id: string;
      title: string;
    },
  ];
  sources: [
    {
      id: string;
      url: string;
    },
  ];
  geometry: [
    {
      magnitudeValue: string;
      magnitudeUnit: string;
      date: string;
      type: string;
      coordinates: [number];
    },
  ];
}

export interface IGeoComponent {
  'ISO_3166-1_alpha-2': string;
  'ISO_3166-1_alpha-3': string;
  'ISO_3166-2': [string];
  _category: string;
  _type: string;
  city: string;
  city_district: string;
  continent: string;
  country: string;
  country_code: string;
  county: string;
  county_code: string;
  hamlet: string;
  political_union: string;
  postcode: string;
  road: string;
}
