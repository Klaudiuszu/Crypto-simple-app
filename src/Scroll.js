import App from './App.js';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Scroll() {

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    let maxiumScrollValue = Math.max([position]);
    setScrollPosition(position);    
    if(maxiumScrollValue){
      //document.body.style.backgroundColor = "pink";
    }
    
  };



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    }
  });

  return(
    <div className='.App'>
    <p>{console.log(scrollPosition)}</p>
    </div>
  );
}

export default Scroll;