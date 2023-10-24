import React from 'react';
import "../CSS/Font.css";
import BeritaList from '../Pages/BeritaList';
import HotNews from '../Pages/ListNews';


function Home() {
  return (
    <div className="container-News">
      <div className="row">
        <div className="col-md-9">
            <BeritaList/>

        {/* <BeritaList /> */}

        </div>

        {/* Center Component (Hotnews) */}
        <div className="col-md-3">
            <HotNews/>
         {/* <BeritaPortal/> */}

        </div>
      </div>
    </div>
  );
}

export default Home;
