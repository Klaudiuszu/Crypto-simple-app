import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const searchParams = ["name"];

const searchResults = (items, searchParams, search) => {
  return items.filter((item) =>
    searchParams.some((newItem) =>
      item[newItem]
        .toString()
        .toLowerCase()
        .substring(0, search.length)
        .includes(search)
    )
  );
};

const NavBar = ({ search, setSearch }) => {
  return (
    <div className="navbar">
      <input
        placeholder="input cypto name"
        name="name"
        id="name"
        required
        className="input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const DataList = ({ data, search }) => {
  return (
    <div className="row">
      {/* Item is whole element in array */}
      {searchResults(data, searchParams, search.toString().toLowerCase()).map(
        (item) => {
          return (
            <div className="column" key={item.id}>
              <p className="text">{item.name}</p>
              <p className="text">{item.country}</p>
              <img src={item.image}></img>
              <a href={item.url} className="linkButton">
                LINK
              </a>
            </div>
          );
        }
      )}
    </div>
  );
};

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

  const [search, setSearch] = useState("");



  //const [limit, setLimit] = useState(5);

  const initalCallApi = `https://api.coingecko.com/api/v3/exchanges?per_page=${itemPerPage}}&page=1`;

  // const loadMoreApi = `https://api.coingecko.com/api/v3/exchanges?offset=${offset}&limit=${limit}`;

  // const a = [1, 2, 3, 4, 5];
  // const c = ["a", "b"];
  // const b = [...a, "d", ...c];

  // const Button = (props) => {
  //   console.log(data);
  //   return (
  //     <button onClick={() => setItemPerPage(itemPerPage + 1)}>
  //       {props.text}
  //     </button>
  //   );
  // };

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(initalCallApi);
    setBottomReached(false);
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

    setTimeout(() => {
    if (windowBottom >= docHeight) {
      setBottomReached(true);
      setItemPerPage(itemPerPage + 4);
      return;
    }
  }, 100);
    
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[itemPerPage]);

  return (
    <div className="App">
    {loading &&
        <div className="centering-loader">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      }
      <NavBar search={search} setSearch={setSearch} />
      <DataList data={data} search={search} />
    </div>
  );
}

export default App;
