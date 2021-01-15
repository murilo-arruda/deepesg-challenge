import React, { useState, useEffect } from 'react';
import CityDataView from './CityDataView';
import CityInfoFallback from './CityInfoFallBack';

type cityProps = {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
};
type status = 'idle' | 'pending' | 'resolved' | 'rejected';
type cityInfoProps = {
  city: string;
  handleSave: (arg0: cityProps) => void;
};

async function fetchCity(name: string) {
  const response = await fetch('/api/city', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log(data);
    if (data) {
      //city.fetchedAt = formatDate(new Date())
      return data;
    } else {
      return Promise.reject(new Error(`No City with the name "${name}"`));
    }
  } else {
    console.log('uncaught error');
    return Promise.reject(new Error('Erro ao buscar cidade'));
  }
}

function CityInfo({ city, handleSave }: cityInfoProps) {
  const [status, setStatus] = useState<status>('idle');
  const [state, setState] = useState<cityProps>({
    name: '',
    wind: '',
    temp: '',
    humidity: '',
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
          setStatus('rejected');
        });
    }
  }, [city]);

  switch (status) {
    case 'idle':
      return <div>Digite uma cidade</div>;
    case 'pending':
      return <CityInfoFallback city={city} />;
    case 'resolved':
      return <CityDataView cityData={state} handleSave={handleSave} />;
    case 'rejected':
      throw 'error rejected!';

    default:
      return <div>Digite uma cidade</div>;
  }
}
export default CityInfo;
