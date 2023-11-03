import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '../CSS/TopBar.css';
import '../CSS/Font.css';

const Topbar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDate = currentDate.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6 d-none d-sm-block">
            <div className="topsocial">
              <a href="https://www.facebook.com/diskominfo.karanganyar" data-toggle="tooltip" data-placement="bottom" title="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.youtube.com/@KabKaranganyar" data-toggle="tooltip" data-placement="bottom" title="Twitter">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.instagram.com/diskominfo_karanganyar" data-toggle="tooltip" data-placement="bottom" title="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
          <div className="col-lg-4 d-none d-md-block">
            <div className="topmenu text-center">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a href="https://link-ke-diskominfo-pembkab" className="link-normal">
                    DISKOMINFO
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://link-ke-diskominfo-karanganyar" className="link-normal">
                    PEMKAB Karanganyar
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://link-untuk-write-for-us" className="link-normal">
                    Write for us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <div className="topsearch text-right">
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
