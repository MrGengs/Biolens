// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHgAtf83Qd5N_d9HjK44cUvwV06h3Kl-c",
    authDomain: "biolens-01.firebaseapp.com",
    projectId: "biolens-01",
    storageBucket: "biolens-01.firebasestorage.app",
    messagingSenderId: "491227049607",
    appId: "1:491227049607:web:58e0330e77230a80ed9222"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firestore
const db = firebase.firestore();

// Initialize Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Function to save user data to Firestore
async function saveUserToFirestore(user) {
    const userRef = db.collection('users').doc(user.uid);
    const doc = await userRef.get();
    
    if (!doc.exists) {
        // User doesn't exist, create new user document
        await userRef.set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL || '',
            provider: user.providerData[0].providerId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
    } else {
        // Update last login time for existing user
        await userRef.update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
}
