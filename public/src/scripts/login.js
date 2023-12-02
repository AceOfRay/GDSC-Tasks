import { auth } from "./init.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// google sign in logic
const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  await signInWithRedirect(auth, provider);
  window.location.href = "/src/html/taskHome.html";
};

const googleLogin = document.getElementById("googleLogin");
googleLogin.addEventListener("click", loginWithGoogle);

// normal login logic

const loginBtn = document.getElementById("loginButton");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;
  const pswd = document.getElementById("passwordInput").value;

  signInWithEmailAndPassword(auth, email, pswd)
    .then(() => {
      window.location.href = "/src/html/taskHome.html";
    })
    .catch((error) => {
      const provider = email.split("@")[1].split(".")[0];
      if (provider == "gmail") {
        alert(`Error Signing in: Try Signing in with ${provider} : ${error.message}` );
      }
    });
});

// if the user is logged in, forward to taskHome.html

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "/src/html/taskHome.html";
  }
});
