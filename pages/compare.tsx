import Link from 'next/link';
import useLocalStorage from '../utils/useLocalStorage';

function Compare() {
  const [history, setHistory] = useLocalStorage('cidade');
  if (history.length > 0) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>CIDADE</th>
              <th>TEMPERATURA</th>
              <th>UMIDADE</th>
              <th>VENTO</th>
            </tr>
          </thead>
          <tbody>
            {history.map(city => (
              <tr key={city.name}>
                <td>{city.name}</td>
                <td>{city.temp}</td>
                <td>{city.humidity}</td>
                <td>{city.wind}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link href="/">
          <button>Voltar</button>
        </Link>
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
