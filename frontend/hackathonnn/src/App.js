import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/search';
import SupersetEmbedded from './components/superset';
import Filter from './components/filter';
import ListItems from './components/listItem';
import { Box } from '@mui/material';

const sendHttpRequest = async (url, method, data, headers) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

function App() {
  const [requestUrl, setRequestUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [responseData, setResponseData] = useState(null);

  const fetchData = async () => {
    try {
      const result = await sendHttpRequest(requestUrl, 'get', null, {});

      setResponseData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUrlChange = (event) => {
    setRequestUrl(event.target.value);
  };

  return (
<div className='App'>
<Search />
<Box display='flex' flexDirection='row'>
<Filter />
<ListItems />
</Box>
<SupersetEmbedded supplier_inn={7720518494}/>
</div>

  );
}

export default App;