import React, { useState, useCallback } from 'react';
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  Marker,
} from 'react-map-gl';
import Icon from '@material-ui/core/Icon';

import { usePopup, useDistricts, useStations } from './hooks';

/**
 * Map display page
 */
export default function Map() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    longitude: -74,
    latitude: 40.7,
    zoom: 11,
  });

  const { districts, showDistricts, switchDistricts } = useDistricts();
  const { stations, showStations, switchStations } = useStations();
  const { closePopup, showPopup, currentPopup, displayPopup } = usePopup(
    stations
  );

  return (
    <div className="map-zone-container">
      <ReactMapGL
        {...viewport}
        width="90vw"
        height="80vh"
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      >
        {showDistricts && (
          <Source id="districts" type="geojson" data={districts}>
            <Layer
              id="layer-districts"
              type="fill"
              paint={{
                'fill-color': '#dba400',
                'fill-opacity': 0.5,
                'fill-outline-color': '#000',
              }}
            />
          </Source>
        )}

        {stations &&
          stations.features &&
          stations.features.map((station: any) => {
            const [longitude, latitude] = station.geometry.coordinates;

            if (showStations) {
              return (
                <Marker
                  key={station.properties.id}
                  latitude={latitude}
                  longitude={longitude}
                  offsetLeft={-20}
                  offsetTop={-10}
                  className="station-marker"
                >
                  <Icon
                    className="marker-icon"
                    fontSize="inherit"
                    data-id={station.properties.id}
                    onPointerEnter={showPopup}
                    onPointerLeave={closePopup}
                  >
                    place
                  </Icon>
                </Marker>
              );
            }

            return null;
          })}

        {displayPopup()}

        <div style={{ position: 'absolute', right: '1em', top: '1em' }}>
          <NavigationControl showCompass={false} />
        </div>

        <menu className="map-menu">
          <li>
            <button onPointerUp={switchDistricts}>
              {showDistricts ? (
                <Icon className="map-menu-icon" title="Hide districts layer">
                  layers_clear
                </Icon>
              ) : (
                <Icon className="map-menu-icon" title="Show districts layer">
                  layers
                </Icon>
              )}
            </button>
          </li>
          <li>
            <button onPointerUp={switchStations}>
              {showStations ? (
                <Icon className="map-menu-icon" title="Hide stations markers">
                  location_off
                </Icon>
              ) : (
                <Icon className="map-menu-icon" title="Show stations markers">
                  location_on
                </Icon>
              )}
            </button>
          </li>
        </menu>
      </ReactMapGL>
    </div>
  );
}
