import { districtToGeometry } from '../../core';
import { ZoneGeometry } from '../types';

class DistrictsRepository {
  static async getAll() {
    return fetch('https://data.cityofnewyork.us/resource/jp9i-3b7y.json')
      .then((resp) => resp.json())
      .then((data) => {
        const districtsData: ZoneGeometry = {
          type: 'FeatureCollection',
          features: [],
        };

        data.forEach((district: any) => {
          districtsData.features.push(districtToGeometry(district));
        });

        return districtsData;
      });
  }
}

export default DistrictsRepository;
