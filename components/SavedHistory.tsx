import Link from 'next/link';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
interface cityProps {
  wind: string;
  humidity: string;
  temp: string;
  name: string;
  fetchedAt?: string;
}
type SavedHistoryProps = {
  history: cityProps[];
  removeCity: (args0: string) => void;
};
function SavedHistory({ history, removeCity }: SavedHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-gray-50 p-4 shadow mt-3">
        <p className="text-center text-pink-500">Sem cidades salvas</p>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-50 p-8 shadow mt-3">
        <h3 className="text-xl text-gray-700 font-semibold leading-tight my-3">
          Cidades Salvas
        </h3>
        <ul className="flex flex-col">
          <TransitionGroup>
            {history.map((city: cityProps) => (
              <CSSTransition key={city.name} timeout={100} classNames="item">
                <li
                  key={city.name}
                  className="mb-2 flex justify-between items-start"
                >
                  <span className="text-lg text-gray-700 leading-tight my-3">
                    {city.name}{' '}
                  </span>
                  <button
                    onClick={() => removeCity(city.name)}
                    className="inline-block p-2 text-center text-white transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                  >
                    <img className="w-3 h-3" src="/delete.svg" alt="deletar" />
                  </button>
                </li>
              </CSSTransition>
            ))}
            {history.length >= 2 && (
              <Link href="compare">
                <button className="w-full inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
                  Comparar
                </button>
              </Link>
            )}
          </TransitionGroup>
        </ul>
      </div>
    );
  }
}

export default SavedHistory;
