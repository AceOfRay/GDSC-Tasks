import { database, auth } from "./init.js";
import {
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
  if (user) {
    let uid = user.uid;
    createTaskBtn.addEventListener("click", () => {
      const taskName = document.getElementById("taskName").value;
      const date = document.getElementById("dueDate").value;
      const description = document.getElementById("newTaskDescrip").value;

      const dateObject = new Date(date);
      const stringDate = `${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${dateObject
        .getDate()
        .toString()
        .padStart(2, "0")}/${dateObject.getFullYear()}`;

      // save this task in firebase and have "onChildAdded" take care of real time updates
      push(ref(database, "users/" + uid +"/tasks"), {
        date: stringDate,
        taskName: taskName,
        description: description,
        completed: false,
      });
      modal.style.display = "none";
    });
  }
});

const modal = document.getElementById("newTaskModal");
const newTaskButton = document.getElementById("newTask");
const closeModalButton = document.getElementById("closeModal");

// Show the modal when the "New Task" button is clicked
newTaskButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Hide the modal when the close button is clicked
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Hide the modal when the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

const createTaskBtn = document.getElementById("addTaskSubmit");
