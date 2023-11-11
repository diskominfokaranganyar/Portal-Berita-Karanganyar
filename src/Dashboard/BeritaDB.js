import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BeritaTema = () => {
  const [temaData, setTemaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:5003/api/beritaPemerintahan'),
          axios.get('http://localhost:5003/api/beritaPendidikan'),
          axios.get('http://localhost:5003/api/beritaPariwisata'),
          axios.get('http://localhost:5003/api/beritaOlahraga'),
          axios.get('http://localhost:5003/api/beritaPertanian'),
          axios.get('http://localhost:5003/api/beritaLainnya'),
        ]);

        const data = responses.map((response) => response.data);
        setTemaData(data);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Jumlah Berita Per Tema</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
        {temaData.map((tema, index) => (
          <div key={index} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{tema.title}</h5>
                <p className="card-text">{tema.count} Berita</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeritaTema;
