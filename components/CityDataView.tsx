import useLocalStorage from '../utils/useLocalStorage';

type cityProps = {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
  fetchedAt: string;
};
type CityDataViewProps = {
  cityData: cityProps;
  handleSave: (arg0: cityProps) => void;
  isFallBack: boolean;
};

function CityDataView({ cityData, handleSave, isFallBack }: CityDataViewProps) {
  const [history, setHistory] = useLocalStorage('cidade');

  return (
    <div className={`px-4 ${isFallBack ? 'animate-pulse' : ''}`}>
      <h3 className="text-2xl text-gray-700 font-semibold leading-tight my-3">
        <img
          className="w-7 h-7 m-auto inline-block mr-2"
          src="/city.svg"
          alt="Cidade"
        />
        {cityData.name}
      </h3>
      <p className="text-xs text-gray-500">{cityData.fetchedAt}</p>
      <div className="flex flex-col">
        <p className="mb-2">
          <span className="text-sm uppercase text-gray-500 leading-tight">
            Temperatura
          </span>{' '}
          <span className="text-2xl text-gray-700 font-semibold leading-tight my-3">
            {cityData.temp}º
          </span>
        </p>
        <p className="mb-2">
          <span className="text-sm uppercase text-gray-500 leading-tight">
            Umidade
          </span>{' '}
          <span className="text-2xl text-gray-700 font-semibold leading-tight my-3">
            {cityData.humidity}%
          </span>
        </p>
        <p className="mb-2">
          <span className="text-sm uppercase text-gray-500 leading-tight">
            Vento
          </span>{' '}
          <span className="text-2xl text-gray-700 font-semibold leading-tight my-3">
            {cityData.wind}
          </span>
        </p>
        <button
          disabled={isFallBack}
          onClick={() => handleSave(cityData)}
          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
        >
          Salvar{' '}
          <img
            className="w-7 h-7 m-auto inline-block"
            src="/save.svg"
            alt="Disquete antigo"
          />
        </button>
      </div>
    </div>
  );
}

export default CityDataView;
