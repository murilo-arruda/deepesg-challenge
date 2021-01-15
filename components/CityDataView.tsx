import useLocalStorage from '../utils/useLocalStorage';

type cityProps = {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
};
type CityDataViewProps = {
  cityData: cityProps;
  handleSave: (arg0: cityProps) => void;
};

function CityDataView({ cityData, handleSave }: CityDataViewProps) {
  const [history, setHistory] = useLocalStorage('cidade');

  return (
    <div>
      <h3>{cityData.name}</h3>
      <p>Temperatura: {cityData.temp}º</p>
      <p>Umidade: {cityData.humidity}%</p>
      <p>Vento: {cityData.wind}</p>
      <button onClick={() => handleSave(cityData)}>Salvar</button>
    </div>
  );
}

export default CityDataView;
