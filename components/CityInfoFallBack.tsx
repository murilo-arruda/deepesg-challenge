import React, { useRef } from 'react';
import CityDataView from './CityDataView';
type CityInfoFallbackProps = {
  city: string;
};
function CityInfoFallback({ city }: CityInfoFallbackProps) {
  const initialName = useRef(city).current;
  const fallbackCityData = {
    name: initialName,
    wind: 'XXX',
    temp: 'XXX',
    humidity: 'XXX',
  };
  return <CityDataView handleSave={() => null} cityData={fallbackCityData} />;
}
export default CityInfoFallback;
