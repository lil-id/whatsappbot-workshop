# 🤖 Bot Asisten Mahasiswa - WhatsApp Bot with whatsapp-web.js

Bot WhatsApp sederhana untuk membantu mahasiswa mendapatkan informasi cepat seperti jadwal kuliah, info dosen, dan deadline tugas, menggunakan library [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js).

---

## 📦 Fitur Utama

- `!jadwal` – Menampilkan jadwal kuliah
- `!dosen` – Info kontak dosen pengampu
- `!tugas` – Deadline tugas yang akan datang
- `!help` – Daftar perintah yang tersedia

---

## 🛠️ Struktur Proyek

```
student-assistant/
├── node_modules/
├── src/
│   ├── db/
│   │   ├── database.json
│   ├── commands/
│   │   ├── jadwal.js
│   │   ├── dosen.js
│   │   ├── tugas.js
│   │   └── help.js
│   └── index.js         # Entry point bot
├── package.json
└── README.md
```
---

## 🚀 Cara Menjalankan

### 1. Clone repositori ini
```bash
git clone https://github.com/kamu/bot-asisten-mahasiswa.git
cd bot-asisten-mahasiswa
```

### 2. Install dependensi
```bash
npm install
```

### 3. Jalankan bot
```bash
npm start
```

Bot akan menampilkan QR code di terminal. Scan QR tersebut dengan WhatsApp Web untuk login.

## 💬 Contoh Penggunaan
Perintah
```bash
!jadwal
```

Response
```bash
📅 Jadwal Minggu Ini:
- Senin: PBO - 10:00
- Rabu: Jaringan Komputer - 13:00
- Jumat: AI Dasar - 08:00
```

Perintah
```bash
!dosen
```
Response

```bash
👨‍🏫 Dosen Pengampu:
- Bu Rina (PBO) - rina@univ.ac.id
- Pak Budi (JK) - budi@univ.ac.id
```

## 📌 Catatan
Bot ini menggunakan whatsapp-web.js yang membutuhkan sesi aktif WhatsApp Web.

Kamu bisa menambahkan command baru di folder src/commands.

## 🔗 Referensi
[whatsapp-web.js Documentation](https://docs.wwebjs.dev)

[Node.js](https://nodejs.org/en)

[qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)

## 👨‍💻 Kontribusi
Pull request & feedback sangat diterima.
Feel free to fork dan kembangkan bot ini sesuai kebutuhan kampus atau komunitasmu.
