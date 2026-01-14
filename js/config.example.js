// 📋 CONTOH FILE KONFIGURASI
// Copy file ini menjadi config.js dan isi dengan API keys Anda
// File config.js sudah di-gitignore sehingga tidak akan ter-commit ke GitHub

// Konfigurasi API Keys
const API_CONFIG = {
    // Firebase API Key
    // Dapatkan dari: https://console.firebase.google.com/project/YOUR_PROJECT/settings/general
    FIREBASE_API_KEY: "YOUR_FIREBASE_API_KEY_HERE",
    
    // Gemini API Key
    // Dapatkan dari: https://makersuite.google.com/app/apikey
    GEMINI_API_KEY: "YOUR_GEMINI_API_KEY_HERE",
    
    // Firebase Configuration (full config)
    // Dapatkan dari Firebase Console > Project Settings > General
    FIREBASE_CONFIG: {
        apiKey: "YOUR_FIREBASE_API_KEY_HERE",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    }
};
