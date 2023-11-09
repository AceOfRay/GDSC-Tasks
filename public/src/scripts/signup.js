import { auth, database } from "./init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const signupButton = document.getElementById("signUpButton");

signupButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const pswd = document.getElementById("passwordInput").value;

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, pswd);
    await addUserToDb(credential, name, email);
    window.location.href = "/src/html/taskHome.html"; // Redirect after successful signup
  } catch (error) {
    alert("Error Making Account, Error Code: " + error.code);
  }
});

async function addUserToDb(credential, name, email) {
  await set(ref(database, "users/" + credential.user.uid), {
    username: name,
    email: email,
  });
}
