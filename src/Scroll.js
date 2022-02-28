import App from './App.js';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Scroll() {

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);    
  };

  const myDiv = document.querySelector('.App');  
myDiv.addEventListener('scroll', () => {  
  if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight) {  
    console.log('scrolled to bottom')  
  }  
});

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