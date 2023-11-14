import React, { useState, useEffect } from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './home.css';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
    {windowWidth > 850 && <Topbar />}
      <div className="homeContainer">
        
      {windowWidth > 850 && <Sidebar />}

        <Feed />
      {windowWidth > 850 && <Rightbar />}

      </div>
    </>
  );
}
