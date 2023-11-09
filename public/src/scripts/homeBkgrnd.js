import { auth, database } from "./init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    //console.log(auth)
    let uid = user.uid;
    //console.log(user)
  }
});
