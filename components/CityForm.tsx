import React, { useState } from 'react';

type CityFormProps = {
  initialCity?: string;
  onSubmit: Function;
};

function CityForm({ initialCity = '', onSubmit }: CityFormProps) {
  const [city, setCity] = useState(initialCity);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(city);
  }
  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setCity(e.currentTarget.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city-input">Nome da Cidade</label>
      <input
        id="city-input"
        name="city"
        placeholder="digite o nome da cidade..."
        value={city}
        onChange={handleChange}
      />
      <button disabled={!city.length}>Buscar</button>
    </form>
  );
}

export default CityForm;
