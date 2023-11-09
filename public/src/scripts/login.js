import { auth } from "./init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";


const loginBtn = document.getElementById("loginButton");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;
  const pswd = document.getElementById("passwordInput").value;

  signInWithEmailAndPassword(auth, email, pswd)
    .then((credential) => {
      // User signed in successfully, you can handle it here
      // For example, redirect the user
      window.location.href = "/src/html/taskHome.html";
    })
    .catch(
      // Handle the error here
      window.alert("Error: ")
    );
});

