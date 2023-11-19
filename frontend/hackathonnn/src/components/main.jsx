import React, { useState } from 'react';
import axios from 'axios';
import Search from './search';
import Filter from './filter';
import ListItems from './listItem';
import { Box } from '@mui/material';
import Details from './details';

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

function Main() {
  const [requestUrl, setRequestUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [responseData, setResponseData] = useState(null);
  const [hiddenDetails, setHiddenDetails] = useState(false);

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
    <>
    {hiddenDetails ===false ?
<div className='App'>

<Search />
<Box display='flex' flexDirection='row'>
<Filter />
<ListItems props={{hiddenDetails:hiddenDetails, setHiddenDetails:setHiddenDetails}} />
</Box>
</div> :
<Details/>
}
</>
  );
}

export default Main;