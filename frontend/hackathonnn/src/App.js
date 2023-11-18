import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="App">
      <h1>HTTP Request Demo</h1>
      <div>
        <label>
          Enter Request URL:
          <input type="text" value={requestUrl} onChange={handleUrlChange} />
        </label>
        <button onClick={fetchData}>Send Request</button>
      </div>
      <h2>Response Data:</h2>
      {responseData ? (
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      ) : (
        <p>No data available. Make a request above.</p>
      )}
    </div>
  );
}

export default App;