import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TemaChart from '../Components/tema';

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
    <div className="container-fluid">
      <div className="row g-3 my-3">
        {temaData.map((tema, index) => (
          <div key={index} className="col-md-4 mx-auto">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-center align-items-center flex-column rounded text-center">
              <div>
                <p>{tema.title}</p>
                <h3>{tema.count} Berita</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=''>
        <div>
          <TemaChart/>
        </div>
      </div>
    </div>
  );
  
}
export default BeritaTema;
