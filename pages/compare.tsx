import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useLocalStorage from '../utils/useLocalStorage';
interface cityProps {
  [key: string]: string;
  wind: string;
  humidity: string;
  temp: string;
  name: string;
  //fetchedAt?: string
}

interface sort {
  column: string;
  isDecreasing: boolean;
}

function sortByName(valueA: string, valueB: string, isDecreasing: boolean) {
  if (isDecreasing) {
    if (valueA < valueB) return 1;
    if (valueA > valueB) return -1;
  } else {
    if (valueA > valueB) return 1;
    if (valueA < valueB) return -1;
  }
  return 0;
}
function sortByNumber(valueA: number, valueB: number, isDecreasing: boolean) {
  if (isDecreasing) {
    return valueB - valueA;
  } else {
    return valueA - valueB;
  }
}

function Compare() {
  const [history, setHistory] = useLocalStorage('cidade');
  const [sortedCities, setSortedCities] = useState<cityProps[]>([]);
  const [sort, setSort] = useState<sort>({
    column: 'cidade',
    isDecreasing: false,
  });

  useEffect(() => {
    if (history.length > 0) {
      // default sort before local storage load
      const sorted = history.sort((cityA, cityB) =>
        sortByName(cityA.name, cityB.name, sort.isDecreasing)
      );
      setSortedCities(history);
    }
  }, [history]);

  function handleSort(column: string) {
    const isDecreasing = sort.column === column ? !sort.isDecreasing : false;
    if (column === 'cidade') {
      const sorted = sortedCities.sort((cityA, cityB) =>
        sortByName(cityA.name, cityB.name, isDecreasing)
      );
      setSortedCities(sorted);
    } else {
      let value: string;
      if (column === 'temperatura') {
        value = 'temp';
      }
      if (column === 'umidade') {
        value = 'humidity';
      }
      if (column === 'vento') {
        value = 'wind';
      }
      const sorted = sortedCities.sort((cityA, cityB) =>
        sortByNumber(
          parseFloat(cityA[value]),
          parseFloat(cityB[value]),
          isDecreasing
        )
      );
      setSortedCities(sorted);
    }
    setSort({ column, isDecreasing });
  }

  if (history.length > 0 && sortedCities.length > 0) {
    return (
      <div className="container mx-auto flex-col max-w-sm mt-5">
        <div className="bg-gray-50 p-4 shadow flex flex-col">
          <table className="table-fixed mb-3">
            <thead>
              <tr>
                <th className="w-1/4" onClick={() => handleSort('cidade')}>
                  <div className="flex items-center justify-center">
                    <img className="w-10 h-10" src="/city.svg" alt="Cidade" />
                    <div className="w-7 h-7">
                      {sort.column === 'cidade' && sortArrow(sort.isDecreasing)}
                    </div>
                  </div>
                </th>
                <th
                  className="w-2/12"
                  onClick={() => handleSort('temperatura')}
                >
                  <div className="flex items-center justify-center">
                    <img
                      className="w-10 h-10"
                      src="/temperature.svg"
                      alt="Temperatura"
                    />
                    <div className="w-7 h-7">
                      {sort.column === 'temperatura' &&
                        sortArrow(sort.isDecreasing)}
                    </div>
                  </div>
                </th>
                <th className="w-2/12" onClick={() => handleSort('umidade')}>
                  <div className="flex items-center justify-center">
                    <img className="w-10 h-10" src="/drop.svg" alt="Umidade" />
                    <div className="w-7 h-7">
                      {sort.column === 'umidade' &&
                        sortArrow(sort.isDecreasing)}
                    </div>
                  </div>
                </th>
                <th className="w-3/12" onClick={() => handleSort('vento')}>
                  <div className="flex items-center justify-center">
                    <img
                      className="w-10 h-10"
                      src="/windy.svg"
                      alt="Velocidade dos ventos"
                    />
                    <div className="w-7 h-7">
                      {sort.column === 'vento' && sortArrow(sort.isDecreasing)}
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCities.map(city => (
                <tr key={city.name} className="pb-1">
                  <td className="py-3 ">
                    {' '}
                    <span className="text-left text-lg text-gray-700 font-semibold leading-tight my-3">
                      {city.name}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {' '}
                    <span className="text-lg text-gray-700 font-semibold leading-tight my-3 mr-7">
                      {city.temp}º
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {' '}
                    <span className="text-lg text-gray-700 font-semibold leading-tight my-3 mr-7">
                      {city.humidity}%
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {' '}
                    <span className="text-lg text-gray-700 font-semibold leading-tight my-3 mr-7">
                      {city.wind}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link href="/">
            <button className="px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
              Voltar
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto flex-col max-w-sm mt-5">
      <div className="bg-gray-50 p-4 shadow flex flex-col">
        Adicione cidades para comparar{' '}
        <Link href="/">
          <button className="px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
}

function sortArrow(isUp: boolean) {
  const direction = isUp ? '' : 'transform rotate-180';
  return <img className={`w-5 h-5 ${direction}`} src="/arrow.svg" alt="seta" />;
}
export default Compare;
