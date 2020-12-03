import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
    case 'FETCH_SUCCESS':
      console.log(action.payload);
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        };
    case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
    default:
        throw new Error();
  }
}

  const formatDate = (date) => {
    return new Date(date).toISOString().slice(0,10);
  }

function useDataApi() {
  const [search, setSearch] = useState('');

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: []
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_INIT'});

      try {
        const result = await axios('https://remote-cat-api.herokuapp.com/jobs');

        // Service atm does not include a search option
        // so just filter all the results
        const filteredResult = result.data
          .filter(text => text.title.toLowerCase().includes(search.toLowerCase()))
          .map(item => {
            return {
              ...item,
              creationdate: formatDate(item.creationdate)
            }
          })

        dispatch({type: 'FETCH_SUCCESS', payload: filteredResult});

      } catch(error) {
        dispatch({type: 'FETCH_FAILURE'});
      }
    };

    fetchData();
  }, [search]);

  return [state, setSearch];
}

export default useDataApi;