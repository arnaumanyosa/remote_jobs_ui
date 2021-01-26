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
        const query = `https://remote-cat-api.herokuapp.com/jobs?search=${search.toLowerCase()}`;
        const result = await axios(query);
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
      } catch(error) {
        dispatch({type: 'FETCH_FAILURE'});
      }
    };

    fetchData();
  }, [search]);

  return [state, setSearch];
}

export default useDataApi;