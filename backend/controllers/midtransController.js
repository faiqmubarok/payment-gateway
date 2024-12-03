const midtransClient = require("midtrans-client");

// Inisialisasi client Midtrans
const snap = new midtransClient.Snap({
  isProduction: false, // Ubah menjadi `true` jika menggunakan mode produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY, // Pastikan server key disimpan di .env
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
