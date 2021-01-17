import React, { useRef } from 'react';
import CityDataView from './CityDataView';
type CityInfoFallbackProps = {
  city: string;
};
function CityInfoFallback({ city }: CityInfoFallbackProps) {
  const initialName = useRef(city).current;
  const fallbackCityData = {
    name: `Buscando por ${initialName}...`,
    wind: '--',
    temp: '--',
    humidity: '--',
    fetchedAt: '--',
  };
  return (
    <CityDataView
      isFallBack={true}
      handleSave={() => null}
      cityData={fallbackCityData}
    />
  );
}
export default CityInfoFallback;
