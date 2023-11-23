import { auth } from "./init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";


const loginBtn = document.getElementById("loginButton");


loginBtn.addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;
  const pswd = document.getElementById("passwordInput").value;

  signInWithEmailAndPassword(auth, email, pswd)
    .then((credential) => {
      window.location.href = "/src/html/taskHome.html";
    })
});

