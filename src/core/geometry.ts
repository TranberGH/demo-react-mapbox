/**
 * Create station geojson infos
 * @param {object} station - station data
 */
function stationToGeometry(station: any): any {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [station.lon, station.lat],
    },
    properties: {
      title: station.name,
      id: station.external_id,
      capacity: station.capacity,
    },
  };
}

/**
 * Create district geojson infos
 * @param {object} district - district data
 */
function districtToGeometry(district: any): any {
  let coordinates: number[][] = [];
  const rawCoordinates = district.the_geom?.coordinates;

  if (rawCoordinates[0] && rawCoordinates[0][0]) {
    coordinates = rawCoordinates[0][0];
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'MultiPolygon',
      coordinates: [[[...coordinates]]],
    },
    properties: {
      boro_cd: district.boro_cd,
      shape_area: district.shape_area,
      shape_leng: district.shape_leng,
    },
  };
}
export { stationToGeometry, districtToGeometry };
