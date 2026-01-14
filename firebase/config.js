// Konfigurasi Firebase
// Menggunakan config dari js/config.js (aman, tidak ter-commit ke GitHub)
// Pastikan js/config.js sudah di-load sebelum file ini
const firebaseConfig = API_CONFIG.FIREBASE_CONFIG;

// Inisialisasi Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Inisialisasi layanan
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Fungsi untuk menyimpan data pengguna
async function saveUserToFirestore(user) {
  if (!user) return null;

  try {
    // Pastikan email selalu ada, ambil dari provider data jika tidak ada di user object
    const userEmail =
      user.email || (user.providerData && user.providerData[0]?.email) || "";

    // Pastikan email dalam format lowercase untuk konsistensi
    const normalizedEmail = userEmail.toLowerCase().trim();

    const userData = {
      uid: user.uid,
      email: normalizedEmail,
      emailVerified: user.emailVerified || false,
      displayName: user.displayName || userEmail?.split("@")[0] || "User",
      photoURL:
        user.photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          normalizedEmail || "User"
        )}&background=00897b&color=fff&size=200`,
      provider: user.providerData?.[0]?.providerId || "password",
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      // Jangan timpa createdAt jika user sudah ada
      ...(user.metadata?.creationTime
        ? {}
        : {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          }),
    };

    // Gunakan set dengan merge: true untuk create atau update
    await db.collection("users").doc(user.uid).set(userData, { merge: true });
    return userData;
  } catch (error) {
    throw error;
  }
}

// Variable to track last saved user ID
let lastSavedUserId = null;

// Setup auth state listener with debounce
function setupAuthStateListener() {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // Skip if this is the same user that was just saved
      if (lastSavedUserId === user.uid) {
        return;
      }

      try {
        const userData = await saveUserToFirestore(user);
        lastSavedUserId = user.uid; // Update last saved user ID

        // Update UI if needed
        if (typeof updateUserProfile === "function") {
          updateUserProfile(user);
        }
      } catch (error) {
        // Error handling tetap dipertahankan tanpa console.log
      }
    } else {
      lastSavedUserId = null; // Reset when user logs out
    }
  });
}

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  setupAuthStateListener();

  // Hapus collection testConnection jika ada
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    // Mode pengembangan aktif
  }
});
