import React,{ useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  const [data, setData] = useState( [] );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://remote-cat-api.herokuapp.com/jobs'
      );
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Remote Jobs</h1>
      </header>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <a href="{item.url">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
