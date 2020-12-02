import { useState, useEffect } from 'react';
import axios from 'axios';

function useDataApi() {
  const [data, setData] = useState( [] );
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios('https://remote-cat-api.herokuapp.com/jobs');

        // Service atm does not include a search option
        // so just filter all the results
        const filteredResult = result.data
          .filter(text => text.title.toLowerCase().includes(search.toLowerCase()));

        setData(filteredResult);
      } catch(error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [search]);

  return [{data, isLoading, isError}, setSearch];
}

export default useDataApi;