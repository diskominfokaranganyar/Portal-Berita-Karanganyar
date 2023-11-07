import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sumber = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari API saat komponen dimuat
    axios.get('/api/sumber-berita')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ' + error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Daftar Sumber Berita</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((sumber) => (
            <li key={sumber.id}>
              <h2>{sumber.title}</h2>
              <p>{sumber.sumber_url}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sumber;
