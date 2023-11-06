import { auth } from "./init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const signupButton = document.getElementById("signUpButton");

signupButton.addEventListener("click", (event) => {
    event.preventDefault();
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const pswd = document.getElementById("passwordInput").value;

    createUserWithEmailAndPassword(auth, email, pswd).then((credential) => {
        //do something with credential
        // add user to the database
        console.log('before')
        window.location.href = "/src/html/taskHome.html";
        console.log('after')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage)
    })
})

console.log('Signup Page Rendered');