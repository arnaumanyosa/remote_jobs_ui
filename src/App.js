import React,{ useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  const [data, setData] = useState( [] );
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        'https://remote-cat-api.herokuapp.com/jobs'
      );

      // Service atm does not include a search option
      // so just filter all the results
      const filteredResult = result.data
        .filter(text => text.title.toLowerCase().includes(search.toLowerCase()));

      setData(filteredResult);
      setIsLoading(false);
    };

    fetchData();
  }, [search]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Remote Jobs</h1>
      </header>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
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
