import Link from 'next/link';
import useLocalStorage from '../utils/useLocalStorage';
function Compare() {
  const [history, setHistory] = useLocalStorage('cidade');
  if (history.length > 0) {
    return (
      <div className="container mx-auto flex-col max-w-sm mt-5">
        <div className="bg-gray-50 p-4 shadow flex flex-col">
          <table className="table-fixed mb-3">
            <thead>
              <tr>
                <th className="w-1/4">
                  <img
                    className="w-10 h-10 m-auto"
                    src="/city.svg"
                    alt="Cidade"
                  />
                </th>
                <th className="w-2/12">
                  <img
                    className="w-10 h-10 m-auto"
                    src="/temperature.svg"
                    alt="Temperatura"
                  />
                </th>
                <th className="w-2/12">
                  <img
                    className="w-10 h-10 m-auto"
                    src="/drop.svg"
                    alt="Umidade"
                  />
                </th>
                <th className="w-3/12">
                  <img
                    className="w-10 h-10 m-auto"
                    src="/windy.svg"
                    alt="Velocidade dos ventos"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map(city => (
                <tr key={city.name} className="pb-1">
                  <td className="py-3 ">
                    {' '}
                    <span className="text-left text-lg text-gray-700 font-semibold leading-tight my-3">
                      {city.name}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {' '}
                    <span className="text-lg text-gray-700 font-semibold leading-tight my-3">
                      {city.temp}º
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {' '}
                    <span className="text-lg text-gray-700 font-semibold leading-tight my-3">
                      {city.humidity}%
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {' '}
                    <span className="text-lg text-gray-700 font-semibold leading-tight my-3">
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
    <div>
      Adicione cidades para comparar{' '}
      <Link href="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default Compare;
