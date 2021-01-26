import React,{ useState } from 'react';
import useDataApi from './useDataApi';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [{data, isLoading, isError}, doFetch] = useDataApi();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Remote Jobs Search Engine</h1>
        <form className="App-search-form"
          onSubmit={event => {
          doFetch(query)
          event.preventDefault();
        }}>
          <input
            className="App-search-form-input"
            type="text"
            placeholder="Find your dream job"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button
            className="App-search-form-btn"
            type="submit">
              Search
          </button>
        </form>
      </header>

      <div className="App-content">
        {isError && <div className="App-error-message">Something went wrong ...</div>}

        {isLoading ? (
          <div className="App-loading-sign">Loading...</div>
        ) : (
          <div className="App-results">
            {data.length === 0 ? (
              <div className="App-results-no-results">No results</div>
            ):(
              <div className="App-results-list-count">Num results: {data.length}</div>
            )}
            <ul className="App-results-list">
            {[...data].reverse().map(item => (
              <li className="App-results-list-item" key={item.id}>
                <a href={item.sourceurl} target="_blank" rel="noreferrer">
                  <div className="App-results-list-item-content">
                    <div className="App-results-list-item-company-logo">
                      <img  src={item.companylogourl} alt={item.company}/>
                    </div>
                    <div className="App-results-list-item-title">{item.title}</div>
                    <div className="App-results-list-item-company">{item.company}</div>
                    <div className="App-results-list-item-date">{new Date(item.creationdate).toLocaleDateString()}</div>
                  </div>

                </a>
              </li>
            ))}
          </ul>
          </div>

        )}
      </div>

    </div>
  );
}

export default App;
