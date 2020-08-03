import { useState, useEffect, useCallback } from 'react';

import { stationToGeometry, districtToGeometry } from '../../core';

interface ZoneGeometry {
  type: string;
  features: any[];
}

/**
 * Load app geo data
 */
function useGeoData() {
  const [districts, setDistricts] = useState<any>(null);
  const [stations, setStations] = useState<any>(null);

  useEffect(() => {
    fetch('https://data.cityofnewyork.us/resource/jp9i-3b7y.json')
      .then((resp) => resp.json())
      .then((data) => {
        if (districts === null) {
          const districtsData: ZoneGeometry = {
            type: 'FeatureCollection',
            features: [],
          };

          data.forEach((district: any) => {
            districtsData.features.push(districtToGeometry(district));
          });

          setDistricts(districtsData);
        }
      });

    fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
      .then((resp) => resp.json())
      .then((data) => {
        if (stations === null) {
          const stationsData: ZoneGeometry = {
            type: 'FeatureCollection',
            features: [],
          };
          const rawStations = data.data?.stations;
          rawStations.forEach((station: any) => {
            stationsData.features.push(stationToGeometry(station));
          });
          setStations(stationsData);
        }
      });
  });

  return { districts, stations };
}

/**
 * Switch popup display
 */
function usePopup() {
  const [currentPopup, setCurrentPopUp] = useState(null);

  const showPopup = useCallback((evt: any) => {
    setCurrentPopUp(evt.target.dataset.id);
  }, []);

  const closePopup = useCallback(() => {
    setCurrentPopUp(null);
  }, []);

  return { closePopup, showPopup, currentPopup };
}

export { useGeoData, usePopup };
