const mysql = require('mysql2');

// Konfigurasi koneksi ke database
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portalberita',
};

// Buat objek koneksi
const dbConnection = mysql.createConnection(dbConfig);

// Hubungkan ke database
dbConnection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = dbConnection;
