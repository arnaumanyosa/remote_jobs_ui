import React,{ useState } from 'react';
import useDataApi from './useDataApi';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [{data, isLoading, isError}, doFetch] = useDataApi();


  return (
    <div className="App">
      <header className="App-header">
        <h1>Remote Jobs</h1>
      </header>
      <form onSubmit={event => {
        doFetch(query)
        event.preventDefault();
      }}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <a href="{item.url">{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
