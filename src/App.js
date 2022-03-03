import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Scroll from "./Scroll.js";
import IMAGES from "./images";

function App() {
  //reslove
  const [data, setData] = useState([]);
  //rejected
  const [error, setError] = useState(null);
  //pending
  const [loading, setLoading] = useState(true);
  //number of list
  const [itemPerPage, setItemPerPage] = useState(20);

  const [bottomReached, setBottomReached] = useState(false);

  const [search, setSearch] = useState("")

  const [offset, setOffset] = useState(20);

  const [limit, setLimit] = useState(5);

  const initalCallApi = `https://api.coingecko.com/api/v3/exchanges?per_page=${itemPerPage}}&page=1`;

  // const loadMoreApi = `https://api.coingecko.com/api/v3/exchanges?offset=${offset}&limit=${limit}`;

  const a = [1, 2, 3, 4, 5];
  const c = ["a", "b"];
  const b = [...a, "d", ...c];

  console.log(b);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const DataList = ({ data }) => {
    return (
      <div className="row">
        {/* Item is whole element in array */}
        {data.map((item, index) => {
          if (item.name.includes(search)) {
            return (
              <div className="column" key={index}>
                <p className="text">{item.name}</p>
                <p className="text">{item.country}</p>
                <img src={item.image}></img>
                <p>
                  <button>link</button>
                </p>
              </div>
            );
          }
        })}
      </div>
    );
  };

  const Button = (props) => {
    console.log(data);
    return (
      <button onClick={() => setItemPerPage(itemPerPage + 1)}>
        {props.text}
      </button>
    );
  };

  useEffect(() => {
    fetchData(initalCallApi);
    // setBottomReached(false);
    // setBottomReached(false)
    // deppendencies array
  }, [itemPerPage]);

  // useEffect(() => {
  //   if(bottomReached) {
  //     fetchData(loadMoreApi);
  //   }
  //   // deppendencies array
  // }, [bottomReached]);
  // }) => every render
  // },[]) => first render
  // },[something] => when value change

  const handleScroll = () => {
    const windowHeight =
      // "s" 1 true [] {}
      // truthy ? LECI : nie leci
      // falsy ? nie leci : LECI
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      setBottomReached(true);
      setItemPerPage(itemPerPage + 4);
      document.body.style.backgroundColor = "pink";
      return;
    }
    document.body.style.backgroundColor = "black";
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <DataList data={data} />
      <Button text="BUTTON" />
    </div>
  );
}

export default App;