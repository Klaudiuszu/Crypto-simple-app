import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiLink = "https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1";

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



  const DataList = ({data}) => {
    return (
      <div>
        {/* Item is whole element in array */}
        {data.map((item, index) => (
          <div key={index}>{item.country}</div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    fetchData(apiLink)
    // deppendencies array
},[])
  // }) => every render
  // },[]) => first render
  // },[something] => when value change

  


  return (
    <div className="App">
      <DataList data={data} />
    </div>
  );
}

export default App;
