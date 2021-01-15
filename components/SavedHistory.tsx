import Link from 'next/link';

interface cityProps {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
}
type SavedHistoryProps = {
  history: cityProps[];
  removeCity: (args0: string) => void;
};
function SavedHistory({ history, removeCity }: SavedHistoryProps) {
  if (history.length === 0) {
    return <div>Sem cidades salvas</div>;
  } else {
    //convert to table
    return (
      <div>
        <ul>
          {history.map((city: cityProps) => (
            <li key={city.name}>
              {city.name}{' '}
              <button onClick={() => removeCity(city.name)}>remover</button>
            </li>
          ))}
        </ul>
        {history.length >= 2 && (
          <Link href="compare">
            <button>Comparar</button>
          </Link>
        )}
      </div>
    );
  }
}

export default SavedHistory;
