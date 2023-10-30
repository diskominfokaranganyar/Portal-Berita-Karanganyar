// Import kamus sentimen
const kamusSentimen = require('./Assets/Kamus/KamusSentimen.json'); // Sesuaikan dengan path file sesuai kebutuhan

// Kamus positif dan negatif
const kamusPositif = kamusSentimen.Positif;
const kamusNegatif = kamusSentimen.Negatif;

// Alasan sentimen negatif
const alasanNegatif = {
  "korupsi": "Korupsi merugikan masyarakat dan melemahkan perekonomian.",
  "kecurangan": "Kecurangan merusak kepercayaan dan kesejahteraan masyarakat.",
  // Tambahkan alasan untuk kata-kata negatif lainnya
};

// Skrip analisis sentimen
function analyzeSentimen(text) {
  const words = text.split(" ");
  let totalSentiment = 0;
  let kataKata = [];

  words.forEach(word => {
    const cleanedWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    if (kamusPositif[ cleanedWord ]) {
      totalSentiment += kamusPositif[ cleanedWord ];
      kataKata.push( cleanedWord );
    } else if (kamusNegatif[ cleanedWord ]) {
      totalSentiment += kamusNegatif[ cleanedWord ];
      kataKata.push( cleanedWord );
    }
  });

  if (totalSentiment > 0) {
    return { sentimen: "Positif", totalSkor: totalSentiment, kataKata, alasan: "Teks mengandung kata-kata positif." };
  } else if (totalSentiment < 0) {
    return { sentimen: "Negatif", totalSkor: totalSentiment, kataKata, alasan: kataKata.map(word => alasanNegatif[ word ]).join(" ") };
  } else {
    return { sentimen: "Netral", totalSkor: 0, kataKata: [], alasan: "Teks tidak mengandung kata-kata positif atau negatif." };
  }
}

// Contoh penggunaan
const teks = "Korupsi dan kecurangan merugikan masyarakat.";
const hasilSentimen = analyzeSentimen(teks);
console.log(`Sentimen: ${hasilSentimen.sentimen}`);
console.log(`Total Skor: ${hasilSentimen.totalSkor}`);
console.log(`Kata-kata: ${hasilSentimen.kataKata.join(", ")}`);
console.log(`Alasan: ${hasilSentimen.alasan}`);
