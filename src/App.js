import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    fetchData(https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1)
    },[itemPerPage]);
  // },[something] => when value change

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

  const Button = (props) => {
    return (
      <button onClick={() => setItemPerPage(itemPerPage + 10)}>{props.button}</button>
    )
  }

  return (
    <div className="App">
      <DataList data={data} />
      <Button />
    </div>
  );
}

export default App;
