import React, { useState, useEffect, useCallback } from 'react';
import { Popup } from 'react-map-gl';

import { DistrictsRepository } from '../../data/districts';
import { StationsRepository } from '../../data/stations';

/**
 * Switch popup display
 */
function usePopup(stations: any) {
  const [currentPopup, setCurrentPopUp] = useState(null);

  const showPopup = useCallback((evt: any) => {
    setCurrentPopUp(evt.target.dataset.id);
  }, []);

  const closePopup = useCallback(() => {
    setCurrentPopUp(null);
  }, []);

  const displayPopup = useCallback(() => {
    let stationInfos = null;
    // Find current station infos to display
    if (stations) {
      stationInfos = stations.features.find((station: any) => {
        return station.properties.id === currentPopup;
      });
    }

    if (stationInfos) {
      const { title, capacity } = stationInfos.properties;
      const [longitude, latitude] = stationInfos.geometry.coordinates;

      return (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={false}
          className="map-popup"
        >
          <h4 className="map-popup-title">
            <em>{title}</em> station
          </h4>
          <p>Capacity: {capacity} bikes</p>
        </Popup>
      );
    }

    return null;
  }, [currentPopup, stations]);

  return { closePopup, showPopup, currentPopup, displayPopup };
}

function useDistricts() {
  const [districts, setDistricts] = useState<any>(null);
  const [showDistricts, setShowDistricts] = useState(true);

  /**
   * Switch disticts layer display
   */
  const switchDistricts = useCallback(() => {
    setShowDistricts((show) => !show);
  }, [showDistricts]);

  /**
   * Fetch districts geoJSON data
   */
  useEffect(() => {
    if (districts === null) {
      DistrictsRepository.getAll().then((districtsData) => {
        setDistricts(districtsData);
      });
    }
  });

  return { districts, showDistricts, switchDistricts };
}

function useStations() {
  const [stations, setStations] = useState<any>(null);
  const [showStations, setShowStations] = useState(true);

  /**
   * Switch stations markers display
   */
  const switchStations = useCallback(() => {
    setShowStations((show) => !show);
  }, [showStations]);

  /**
   * Fetch geoJSON bikes stations data
   */
  useEffect(() => {
    (async function () {
      if (stations === null) {
        const stationsData = await StationsRepository.getAll();
        setStations(stationsData);
      }
    })();
  });

  return { stations, showStations, switchStations };
}

function useViewport(initialViewport: any) {
  const [viewport, setViewport] = useState(initialViewport);

  const updateViewport = useCallback(
    (nextViewport: any) => {
      setViewport(nextViewport);
    },
    [viewport]
  );

  return { viewport, updateViewport };
}

export { usePopup, useDistricts, useStations, useViewport };
