import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMzIHE5ahYSs47ZEREVvEZLkzoc1-OVMw",
  authDomain: "gdsc-tasks.firebaseapp.com",
  databaseURL: "https://gdsc-tasks-default-rtdb.firebaseio.com",
  projectId: "gdsc-tasks",
  storageBucket: "gdsc-tasks.appspot.com",
  messagingSenderId: "460327008402",
  appId: "1:460327008402:web:9eeb0cd2b29c6555f60e4b",
  measurementId: "G-HRDVJBTW5C",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };

