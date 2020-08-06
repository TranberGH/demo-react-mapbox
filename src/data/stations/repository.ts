import { stationToGeometry } from '../../core';
import { ZoneGeometry } from '../types';

class StationsRepository {
  static async getAll() {
    return fetch(
      'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
    )
      .then((resp) => resp.json())
      .then((data) => {
        const stationsData: ZoneGeometry = {
          type: 'FeatureCollection',
          features: [],
        };
        const rawStations = data.data?.stations;
        rawStations.forEach((station: any) => {
          stationsData.features.push(stationToGeometry(station));
        });

        return stationsData;
      });
  }
}

export default StationsRepository;
