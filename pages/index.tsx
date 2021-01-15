import React, { useState } from 'react';
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import useLocalStorage from '../utils/useLocalStorage';
import CityForm from '../components/CityForm';
import CityInfo from '../components/CityInfo';
import SavedHistory from '../components/SavedHistory';

type city = {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
};

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function Home() {
  const [city, setCity] = useState('');
  const [history, setHistory] = useLocalStorage('cidade');

  function handleSave(cityData: city) {
    const duplicated = history.findIndex(city => city.name === cityData.name);
    if (duplicated >= 0) {
      const newHistory = history.filter((city, index) => index !== duplicated);

      setHistory([cityData, ...newHistory]);
    } else {
      if (history.length === 5) {
        setHistory([cityData, ...history.slice(0, -1)]);
      } else {
        setHistory([cityData, ...history]);
      }
    }
  }
  function handleRemove(name: string) {
    const newHistory = history.filter(city => city.name !== name);
    setHistory(newHistory);
  }
  function handleSubmit(data: string) {
    setCity(data);
  }
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Weather Check</h2>
      <CityForm onSubmit={handleSubmit} />
      <hr />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setCity('')}
        resetKeys={[city]}
      >
        <CityInfo city={city} handleSave={handleSave} />
      </ErrorBoundary>
      <SavedHistory history={history} removeCity={handleRemove} />
    </div>
  );
}

export default Home;
