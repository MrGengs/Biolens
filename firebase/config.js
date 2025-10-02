// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHgAtf83Qd5N_d9HjK44cUvwV06h3Kl-c",
    authDomain: "biolens-01.firebaseapp.com",
    projectId: "biolens-01",
    storageBucket: "biolens-01.firebasestorage.app",
    messagingSenderId: "491227049607",
    appId: "1:491227049607:web:58e0330e77230a80ed9222"
};

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
        const userEmail = user.email || 
                         (user.providerData && user.providerData[0]?.email) || 
                         '';
        
        // Pastikan email dalam format lowercase untuk konsistensi
        const normalizedEmail = userEmail.toLowerCase().trim();
        
        const userData = {
            uid: user.uid,
            email: normalizedEmail,
            emailVerified: user.emailVerified || false,
            displayName: user.displayName || userEmail?.split('@')[0] || 'User',
            photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(normalizedEmail || 'User')}&background=00897b&color=fff&size=200`,
            provider: user.providerData?.[0]?.providerId || 'password',
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            // Jangan timpa createdAt jika user sudah ada
            ...(user.metadata?.creationTime ? {} : { 
                createdAt: firebase.firestore.FieldValue.serverTimestamp() 
            })
        };

        // Gunakan set dengan merge: true untuk create atau update
        await db.collection('users').doc(user.uid).set(userData, { merge: true });
        console.log('✅ Data pengguna berhasil disimpan');
        return userData;
    } catch (error) {
        console.error('❌ Gagal menyimpan data pengguna:', error);
        throw error;
    }
}

// Variable to track last saved user ID
let lastSavedUserId = null;

// Setup auth state listener with debounce
function setupAuthStateListener() {
    auth.onAuthStateChanged(async (user) => {
        console.log('🔍 Status autentikasi berubah:', user ? 'User login' : 'Tidak ada user');
        
        if (user) {
            // Skip if this is the same user that was just saved
            if (lastSavedUserId === user.uid) {
                console.log('🔄 User data already saved, skipping...');
                return;
            }
            
            try {
                console.log('💾 Menyimpan data pengguna...');
                const userData = await saveUserToFirestore(user);
                lastSavedUserId = user.uid; // Update last saved user ID
                console.log('👤 Data pengguna tersimpan:', user.uid);
                
                // Update UI if needed
                if (typeof updateUserProfile === 'function') {
                    updateUserProfile(user);
                }
            } catch (error) {
                console.error('❌ Error saat menyimpan data pengguna:', error);
            }
        } else {
            lastSavedUserId = null; // Reset when user logs out
        }
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Aplikasi siap');
    setupAuthStateListener();
    
    // Hapus collection testConnection jika ada
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Mode pengembangan aktif');
    }
});
