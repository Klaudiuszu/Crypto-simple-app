import './App.css';
import {useEffect, useState} from 'react';
import  axios from 'axios';

function App() {
  //reslove
  const [data, setData] = useState([]);
  //rejected
  const [error, setError] = useState(null);
  //pending
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;
