import { useState, useEffect, useCallback } from 'react';

import { stationToGeometry, districtToGeometry } from '../../core';

interface ZoneGeometry {
  type: string;
  features: any[];
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

function useDistricts() {
  const [districts, setDistricts] = useState<any>(null);
  const [showDistricts, setShowDistricts] = useState(true);

  const switchDistricts = useCallback(() => {
    setShowDistricts((show) => !show);
  }, [showDistricts]);

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
  });

  return { districts, showDistricts, switchDistricts };
}

function useStations() {
  const [stations, setStations] = useState<any>(null);
  const [showStations, setShowStations] = useState(true);

  const switchStations = useCallback(() => {
    setShowStations((show) => !show);
  }, [showStations]);

  useEffect(() => {
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

  return { stations, showStations, switchStations };
}

export { usePopup, useDistricts, useStations };
