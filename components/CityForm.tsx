import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

type CityFormProps = {
  initialCity?: string;
  onSubmit: Function;
};
const states: { [index: number]: { name: string; alias: string } } = {
  11: { name: 'Rondônia', alias: 'RO' },
  12: { name: 'Acre', alias: 'AC' },
  13: { name: 'Amazonas', alias: 'AM' },
  14: { name: 'Roraima', alias: 'RR' },
  15: { name: 'Pará', alias: 'PA' },
  16: { name: 'Amapá', alias: 'AP' },
  17: { name: 'Tocantins', alias: 'TO' },
  21: { name: 'Maranhão', alias: 'MA' },
  22: { name: 'Piauí', alias: 'PI' },
  23: { name: 'Ceará', alias: 'CE' },
  24: { name: 'Rio Grande do Norte', alias: 'RN' },
  25: { name: 'Paraíba', alias: 'PB' },
  26: { name: 'Pernambuco', alias: 'PE' },
  27: { name: 'Alagoas', alias: 'AL' },
  28: { name: 'Sergipe', alias: 'SE' },
  29: { name: 'Bahia', alias: 'BA' },
  31: { name: 'Minas Gerais', alias: 'MG' },
  32: { name: 'Espírito Santo', alias: 'ES' },
  33: { name: 'Rio de Janeiro', alias: 'RJ' },
  35: { name: 'São Paulo', alias: 'SP' },
  41: { name: 'Paraná', alias: 'PR' },
  42: { name: 'Santa Catarina', alias: 'SC' },
  43: { name: 'Rio Grande do Sul', alias: 'RS' },
  50: { name: 'Mato Grosso do Sul', alias: 'MS' },
  51: { name: 'Mato Grosso', alias: 'MT' },
  52: { name: 'Goiás', alias: 'GO' },
  53: { name: 'Distrito Federal', alias: 'DF' },
};

interface fuzzyOptions {
  item: { state_id: number; id: number; name: string };
  refIndex: number;
  score: number;
}
async function fetchCitysList() {
  const response = await fetch('/listacidades.json');
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error(`Falha ao buscar lista de cidades`));
  }
}

function CityForm({ initialCity = '', onSubmit }: CityFormProps) {
  const [city, setCity] = useState(initialCity);
  const [fuzzyOptions, setFuzzyOptions] = useState<fuzzyOptions[]>([]);
  const [fuse, setFuse] = useState<any>(null);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    fetchCitysList()
      .then(data => {
        console.log(data.cities);
        setFuse(
          new Fuse(data.cities, {
            keys: ['name'],
            includeScore: true,
          })
        );
      })
      .catch((error: Error) => console.log(error));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(fuse);
    if (fuzzyOptions && fuzzyOptions.length > 0) {
      const { name, state_id } = fuzzyOptions[0].item;
      setCity(name);
      setFocus(false);
      onSubmit(`${name},${states[state_id].alias}`);
    }
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    // Fuzzy search on city list
    setFocus(true);
    const { value } = e.currentTarget;
    if (value.length > 1) {
      const result = fuse.search(value, { limit: 5 });
      setFuzzyOptions(result);
    } else {
      setFuzzyOptions([]);
    }
    setCity(value);
  }
  return (
    <div className="bg-gray-50 p-4 shadow">
      <form onSubmit={handleSubmit} className="flex justify-between ">
        <label hidden htmlFor="city-input">
          Nome da Cidade
        </label>
        <div className="relative self-stretch w-full pr-2">
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className="h-full w-full px-1 bg-gray-50 placeholder-gray-700 focus:ring-2"
            id="city-input"
            name="city"
            placeholder="Digite o nome da cidade..."
            value={city}
            onChange={handleChange}
          />
          <div
            className={`flex flex-col absolute inset-x-0 -bottom-30 bg-gray-50 shadow divide-y cursor-pointer ${
              focus ? '' : 'opacity-0'
            }`}
          >
            {fuzzyOptions.length > 0 &&
              fuzzyOptions.map(data => (
                <div
                  key={data.refIndex}
                  className="p-1"
                  onClick={() => setCity(data.item.name)}
                >
                  {data.item.name}, {states[data.item.state_id].alias}
                </div>
              ))}
          </div>
        </div>
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
