import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Scroll from './Scroll.js';
import IMAGES from './images';

function App() {
  //reslove
  const [data, setData] = useState([]);
  //rejected
  const [error, setError] = useState(null);
  //pending
  const [loading, setLoading] = useState(true);
  //number of list
  const [itemPerPage, setItemPerPage] = useState(20);

  const apiLink = `https://api.coingecko.com/api/v3/exchanges?per_page=${itemPerPage}}&page=1`;

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
      <div className='row'>
        {/* Item is whole element in array */}
        {data.map((item, index) => (
          <div className='column' key={index} >

          <p className='text'>{item.name}</p>
          <p className='text'>{item.country}</p>
          <img src={item.image}></img>
          <p> <button>link</button></p>
          </div>
        ))}
      </div>
    )
  }

  const Button = (props) => {
    console.log(data)
    return(
      <button onClick={() => setItemPerPage(itemPerPage +1)} >{props.text}</button>
    )
    
  }

  useEffect(() => {
    fetchData(apiLink)
    // deppendencies array
},[itemPerPage]);
  // }) => every render
  // },[]) => first render
  // },[something] => when value change






  return (
    
    <div className="App">
      <DataList data={data} />
      <Button text="..." />
      {
        IMAGES && IMAGES.map((item) =>
        <div key={item.id}>
        </div>
        )
      }
      <Scroll />
    </div>
  );
}

export default App;
