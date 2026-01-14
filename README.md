# BioLens

BioLens adalah sistem monitoring keamanan pangan berbasis AI yang menggunakan teknologi computer vision untuk menganalisis dan memastikan keamanan makanan.

## 📋 Tentang Aplikasi

BioLens adalah solusi monitoring keamanan pangan yang menggabungkan teknologi AI, computer vision, dan IoT untuk menganalisis kondisi makanan secara real-time. Aplikasi ini membantu mendeteksi kontaminasi, memantau kualitas makanan, dan memastikan standar keamanan pangan.

### Fitur Utama

- **Analisis Gambar AI**: Analisis gambar makanan menggunakan AI untuk deteksi kontaminasi
- **Kontrol Perangkat**: Kontrol perangkat monitoring keamanan pangan
- **Database**: Penyimpanan dan manajemen data analisis
- **Real-time Monitoring**: Monitoring kondisi makanan secara real-time
- **Chatbot AI**: Asisten AI untuk pertanyaan tentang keamanan pangan
- **Analisis Data**: Analisis data historis untuk tren dan pola

### Parameter yang Dimonitor

Aplikasi ini memantau berbagai parameter keamanan pangan:

- **Visual Analysis** - Analisis visual makanan
- **Contamination Detection** - Deteksi kontaminasi
- **Quality Assessment** - Penilaian kualitas
- **Temperature Monitoring** - Monitoring suhu
- **Humidity Monitoring** - Monitoring kelembaban
- **Storage Conditions** - Kondisi penyimpanan

## 🚀 Cara Menggunakan

### 1. Akses Aplikasi

- Buka file `index.html` di browser untuk melihat halaman utama
- Atau deploy ke Firebase Hosting untuk akses online

### 2. Registrasi & Login

- Klik tombol **Login** di halaman utama
- Atau akses langsung ke `login.html`
- Pilih metode login:
  - **Email & Password**: Daftar dengan email dan password baru
  - **Google Sign-In**: Login menggunakan akun Google

### 3. Dashboard (Home)

Setelah login, Anda akan diarahkan ke halaman Dashboard yang menampilkan:

- **Status Monitoring**: Status sistem monitoring
- **Quick Stats**: Statistik keamanan pangan
- **Recent Analysis**: Analisis terbaru
- **Alerts**: Peringatan keamanan pangan

**Cara Menggunakan Dashboard:**
- Lihat overview sistem di bagian atas
- Scroll untuk melihat statistik dan analisis terbaru
- Klik pada item untuk melihat detail

### 4. Analisis Gambar

- Akses melalui menu **Analisis** di navigasi
- Upload atau ambil gambar makanan
- Sistem akan menganalisis gambar menggunakan AI
- Lihat hasil analisis:
  - Deteksi kontaminasi
  - Penilaian kualitas
  - Rekomendasi

**Cara Menggunakan Analisis:**
- Klik tombol upload atau ambil foto
- Tunggu proses analisis AI
- Lihat hasil dan rekomendasi
- Simpan hasil analisis ke database

### 5. Kontrol Perangkat

- Akses melalui menu **Kontrol** di navigasi
- Monitor dan kontrol perangkat IoT
- Lihat status perangkat sensor
- Kontrol parameter monitoring

**Fitur Kontrol:**
- Status perangkat (Online/Offline)
- Kontrol sensor monitoring
- Pengaturan parameter
- Real-time data dari sensor

### 6. Database

- Akses melalui menu **Database** di navigasi
- Lihat semua data analisis yang tersimpan
- Filter dan cari data
- Export data untuk analisis lebih lanjut

**Fitur Database:**
- Pencarian data
- Filter berdasarkan tanggal, jenis, status
- Detail lengkap setiap analisis
- Export data (CSV, PDF)

### 7. Chatbot AI

- Akses melalui menu **Chatbot** di navigasi
- Tanyakan tentang:
  - Keamanan pangan
  - Interpretasi hasil analisis
  - Tips penanganan makanan
  - Standar keamanan pangan

### 8. Profile

- Akses melalui menu **Profile** di navigasi
- Lihat dan edit informasi profil
- Kelola pengaturan akun
- Riwayat aktivitas

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Firebase
  - Firebase Authentication (Email/Password & Google)
  - Cloud Firestore (Database)
  - Firebase Storage (untuk gambar)
  - Firebase Hosting
- **AI/ML**: 
  - Computer Vision untuk analisis gambar
  - Machine Learning untuk deteksi kontaminasi
- **Libraries**:
  - Chart.js (untuk grafik)
  - Font Awesome (ikon)

## 📁 Struktur File

```
Biolens/
├── index.html              # Halaman utama/landing page
├── login.html              # Halaman login
├── register.html           # Halaman registrasi
├── home.html               # Dashboard monitoring
├── analisis.html           # Analisis gambar AI
├── control.html            # Kontrol perangkat
├── database.html           # Database analisis
├── chatbot.html            # AI Chatbot
├── profile.html            # Profil pengguna
├── js/                     # JavaScript files
│   ├── auth.js             # Authentication
│   ├── config.js            # API Keys (GITIGNORED - jangan commit!)
│   ├── config.example.js   # Template untuk config.js
│   └── ...
├── assets/                 # Assets (logo, images)
├── firebase/               # Firebase configuration
│   └── config.js           # Firebase config
└── firebase.json           # Konfigurasi Firebase Hosting
```

## 🔧 Setup & Deployment

### Setup Lokal

1. Clone atau download repository
2. **Setup API Keys (PENTING!)**:
   - Copy file `js/config.example.js` menjadi `js/config.js`
   - Buka `js/config.js` dan isi dengan API keys Anda:
     - **Firebase API Key**: Dapatkan dari [Firebase Console](https://console.firebase.google.com/project/YOUR_PROJECT/settings/general)
     - **Gemini API Key**: Dapatkan dari [Google AI Studio](https://makersuite.google.com/app/apikey)
   - ⚠️ **PENTING**: File `js/config.js` sudah di-gitignore dan tidak akan ter-commit ke GitHub
3. Buka file `index.html` di browser
4. Untuk fitur lengkap, setup Firebase:
   - Buat project di [Firebase Console](https://console.firebase.google.com)
   - Update konfigurasi di `js/config.js` (FIREBASE_CONFIG)
   - Enable Authentication (Email/Password & Google)
   - Buat Firestore Database
   - Setup Firebase Storage untuk gambar

### Deploy ke Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login ke Firebase:
   ```bash
   firebase login
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

## 📱 Fitur Mobile

Aplikasi ini responsive dan dapat digunakan di:
- Desktop (browser)
- Tablet
- Smartphone (mobile web app)

## 🔐 Keamanan

- **API Keys**: Semua API keys disimpan di `js/config.js` yang sudah di-gitignore
  - File `js/config.js` TIDAK akan ter-commit ke GitHub
  - Gunakan `js/config.example.js` sebagai template
  - Jangan pernah commit file `js/config.js` ke repository public
- Semua halaman dilindungi dengan authentication guard
- Data pengguna disimpan dengan aman di Firebase
- Firestore Security Rules mengatur akses data
- Gambar yang diupload disimpan dengan aman di Firebase Storage

## 📞 Kontak & Support

Untuk pertanyaan atau dukungan, hubungi tim pengembang.

## 👥 Tim Pengembang

- **Sugeng Margono** - Software
- **Maheswara Rizal Hafidz** - IoT

## 📄 Lisensi

© 2024 BioLens. All rights reserved.

---

**Catatan**: Pastikan konfigurasi Firebase sudah benar sebelum menggunakan aplikasi. Beberapa fitur memerlukan koneksi internet dan autentikasi pengguna. Untuk analisis gambar AI, pastikan koneksi internet stabil untuk mengakses layanan AI.
