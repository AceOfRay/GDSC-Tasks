import { auth, database } from "./init.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  ref,
  query,
  orderByChild,
  onChildAdded,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

class Task {
  constructor(uid, key, taskName, taskDate, taskDescription, status) {
    (this.uid = uid),
      (this.key = key),
      (this.taskName = taskName),
      (this.taskDate = taskDate),
      (this.taskDescription = taskDescription),
      (this.status = status);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    let uid = user.uid;
    const tasksRef = ref(database, "users/" + uid + "/tasks");

    onChildAdded(query(tasksRef, orderByChild("date")), (childSnapshot) => {
      const taskData = childSnapshot.val();
      const key = childSnapshot.key;

      //make a new task object
      const newTask = new Task(
        uid,
        key,
        taskData.taskName,
        taskData.date,
        taskData.description,
        taskData.completed
      );

      renderTaskElement(newTask);
    });
    const userEmail = user.email;
    const emailElement = document.getElementById("currentUserEmail");
    emailElement.textContent = userEmail;
  }
});

function renderTaskElement(task) {
  // Create a new task element
  const newTask = document.createElement("div");
  newTask.className = "task";
  newTask.id = task.key;

  // Create the completion checkbox
  const completionDiv = document.createElement("div");
  completionDiv.id = "completion";
  const completionCheckbox = document.createElement("input");
  completionCheckbox.type = "checkbox";
  completionCheckbox.name = "completed";
  completionCheckbox.id = "completionCheckbox";
  completionCheckbox.checked = task.status;

  completionCheckbox.addEventListener("change", () => {
    updateCompletedField(task);
  });

  completionDiv.appendChild(completionCheckbox);
  newTask.appendChild(completionDiv);

  // Create and set the task name
  // Create and set the task name
  const nameElement = document.createElement("p");
  nameElement.id = "name";
  nameElement.textContent = task.taskName; // Corrected property name
  newTask.appendChild(nameElement);

  // Create and set the due date
  const dateElement = document.createElement("p");
  dateElement.id = "date";
  const dateObject = new Date(task.taskDate); // Corrected property name
  dateElement.textContent = `${(dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObject
    .getDate()
    .toString()
    .padStart(2, "0")}/${dateObject.getFullYear()}`;
  newTask.appendChild(dateElement);

  // Create and set the task description
  const descriptionElement = document.createElement("p");
  descriptionElement.id = "description";
  descriptionElement.textContent = task.taskDescription; // Corrected property name
  newTask.appendChild(descriptionElement);

  // Create the options button with the icon
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "optionsBtn";
  deleteBtn.addEventListener("click", async () => {
    const deleteRef = ref(database, "users/" + task.uid + "/tasks/" + task.key);
    remove(deleteRef);
    const removedElement = document.getElementById(task.key);
    removedElement.style.display = "none";
  });
  const iconImage = document.createElement("img");
  iconImage.src = "/src/images/trashIcon.png";
  iconImage.alt = "Icon";
  iconImage.id = "imgIcon";
  deleteBtn.appendChild(iconImage);
  newTask.appendChild(deleteBtn);

  const taskContainer = document.getElementById("taskContainer");
  taskContainer.appendChild(newTask);
}

function updateCompletedField(task) {
  const taskRef = ref(database, "users/" + task.uid + "/tasks/" + task.key);
  update(taskRef, {
    completed: !task.status,
  });
}

const firebaseLogout = () => {
  signOut(auth).then(() => {
    window.location.href = "../index.html";
  });
};

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", firebaseLogout);
