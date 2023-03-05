import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GeoComponent } from '../models/geo-component.model';
import { Geometry } from '../models/geometry.model';
import { WildfireService } from '../wildfire.service';

@Resolver((of) => Geometry)
export class GeometryResolver {
  constructor(private readonly wildfireService: WildfireService) {}

  /**
   * Resolve Geocoding for each wildfire event from NASA API
   * @param geometry defines the parent object
   * @returns geoComponent from OPENCAGE_API with geocodgin info
   */
  @ResolveField('geoComponent', () => GeoComponent)
  async geoComponent(@Parent() geometry: Geometry) {
    const { coordinates } = geometry;
    return this.wildfireService.getGeocode(coordinates);
  }
}
