import React, { useState, useEffect } from 'react';
import CityDataView from './CityDataView';
import CityInfoFallback from './CityInfoFallBack';

type cityProps = {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
  fetchedAt: string;
};
type status = 'idle' | 'pending' | 'resolved' | 'rejected';
type cityInfoProps = {
  city: string;
  handleSave: (arg0: cityProps) => void;
};

const formatDate = (date: Date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

async function fetchCity(name: string) {
  const response = await fetch('/api/city', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  if (response.ok) {
    const fetchedAt = formatDate(new Date());
    return { ...data, fetchedAt };
  } else {
    return Promise.reject(new Error(data.message));
  }
}

function CityInfo({ city, handleSave }: cityInfoProps) {
  const [status, setStatus] = useState<status>('idle');
  const [error, setError] = useState('');
  const [state, setState] = useState<cityProps>({
    name: '',
    wind: '',
    temp: '',
    humidity: '',
    fetchedAt: '',
  });
  useEffect(() => {
    if (city) {
      setStatus('pending');
      fetchCity(city)
        .then((cityData: cityProps) => {
          setState(cityData);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    }
  }, [city]);

  switch (status) {
    case 'idle':
      return (
        <div>
          <p className="text-center text-pink-500">
            digite uma cidade para ver as condições climáticas.
          </p>
        </div>
      );
    case 'pending':
      return <CityInfoFallback city={city} />;
    case 'resolved':
      return (
        <CityDataView
          isFallBack={false}
          cityData={state}
          handleSave={handleSave}
        />
      );
    case 'rejected':
      return <div className="text-center text-red-500">{error}</div>;

    default:
      return (
        <div>
          <p className="text-center text-pink-500">
            digite uma cidade para ver as condições climáticas.
          </p>
        </div>
      );
  }
}
export default CityInfo;
