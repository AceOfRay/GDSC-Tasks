import { auth } from "./init.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

/*
const provider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  await signInWithRedirect(auth, provider)
  window.location.href = "/src/html/taskHome.html";
}

const googleLogin = document.getElementById('googleLogin');
googleLogin.addEventListener('click', loginWithGoogle
);
*/

const loginBtn = document.getElementById("loginButton");


loginBtn.addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;
  const pswd = document.getElementById("passwordInput").value;

  signInWithEmailAndPassword(auth, email, pswd)
    .then((credential) => {
      window.location.href = "/src/html/taskHome.html";
    })
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, redirect or perform other actions here
    window.location.href = "/src/html/taskHome.html";
  }
});

