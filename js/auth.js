// Check authentication state
function checkAuth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      const currentPage = window.location.pathname.split("/").pop() || "";
      const publicPages = ["login.html", "register.html", ""];

      if (user) {
        // User is signed in
        if (currentPage === "login.html" || currentPage === "register.html") {
          // If user is already logged in and tries to access login/register, redirect to home
          window.location.href = "home.html";
        } else {
          resolve(user);
        }
      } else {
        // No user is signed in
        if (!publicPages.some((page) => currentPage === page)) {
          // If not on a public page, redirect to login
          window.location.href = "login.html";
        }
        resolve(null);
      }
    });
  });
}

// Redirect to home after successful login
function redirectAfterLogin() {
  const user = firebase.auth().currentUser;
  if (user) {
    // Check if we're already on the home page to prevent redirect loop
    if (!window.location.pathname.includes("home.html")) {
      window.location.href = "home.html";
    }
  } else if (
    !window.location.pathname.includes("login.html") &&
    !window.location.pathname.includes("register.html")
  ) {
    // If not logged in and not on login/register page, redirect to login
    window.location.href = "login.html";
  }
}

// Logout function
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout Error:", error);
    });
}

// Initialize auth state listener
function initAuth() {
  firebase.auth().onAuthStateChanged((user) => {
    const currentPage = window.location.pathname.split("/").pop() || "";
    const publicPages = ["login.html", "register.html", ""];

    if (user) {
      // User is signed in
      if (currentPage === "login.html" || currentPage === "register.html") {
        // If on login/register page but already logged in, redirect to home
        window.location.href = "home.html";
      }
    } else {
      // No user is signed in
      if (!publicPages.includes(currentPage)) {
        // If not on a public page, redirect to login
        window.location.href = "login.html";
      }
    }
  });
}

// Call initAuth when the page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}
