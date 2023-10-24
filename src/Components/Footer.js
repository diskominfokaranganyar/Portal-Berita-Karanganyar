import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footbar() {
  return (
    <footer className="bg-dark py-5 text-center with-shadow"> {/* Tambahkan class "text-center" */}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h5 className="text-white text-uppercase font-weight-bold">DINAS KOMUNIKASI DAN INFORMASI</h5>
            <p className="text-white">
              Gedung B Lt. 1 Komplek Sekretariat Daerah<br />
              Jln. Lawu No. 385 B Karanganyar Kode Pos 57712<br />
              Telp: (0271) 495039 ext. 228<br />
              Faks: (0271) 495590<br />
              e-mail: diskomnfo.karanganyarkab@gmail.com
            </p>
          </div>
          
          <div className="col-lg-3 mb-4 mb-lg-0">
            <h5 className="text-white text-uppercase font-weight-bold">Sosial Media</h5>
            <div className="d-flex justify-content-center"> {/* Menggunakan class "justify-content-center" */}
              <a
                href="https://www.facebook.com/diskominfo.karanganyar/"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Facebook"
                className="text-white mr-3"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="https://www.youtube.com/@KabKaranganyar"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Youtube"
                className="text-white mr-3"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
              <a
                href="https://www.instagram.com/diskominfo_karanganyar"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Instagram"
                className="text-white"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
          <div className="col-lg-3">
            <h5 className="text-white text-uppercase font-weight-bold">SUMBER BERITA</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.detik.com/tag/bupati-karanganyar?tag_from=karanganyar" className="text-white">Detik-Detik</a></li>
              <li><a href="https://jateng.tribunnews.com/karanganyar-maju" className="text-white">TribunNews</a></li>
              <li><a href="https://www.solopos.com/tag/pertanian-karanganyar" className="text-white">SoloPos</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footbar;
