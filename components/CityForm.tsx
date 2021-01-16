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
    <div className="bg-gray-50 p-4 shadow">
      <form onSubmit={handleSubmit} className="flex justify-between ">
        <label hidden htmlFor="city-input">
          Nome da Cidade
        </label>

        <input
          className="w-full mr-2 px-1 bg-gray-50 placeholder-gray-700 focus:ring-2"
          id="city-input"
          name="city"
          placeholder="Digite o nome da cidade..."
          value={city}
          onChange={handleChange}
        />

        <button
          className="px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
          type="submit"
          disabled={!city.length}
        >
          <img
            className="w-7 h-7 m-auto inline-block"
            src="/search.svg"
            alt="Lupa de busca"
          />
        </button>
      </form>
    </div>
  );
}

export default CityForm;
