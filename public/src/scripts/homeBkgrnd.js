import { auth, database } from "./init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  ref,
  query,
  orderByChild,
  get,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    //console.log(auth)
    let uid = user.uid;
    console.log(user);
    loadTasks(uid);
  }
});

async function loadTasks(uid) {
  try {
    const dbRef = ref(database, "users/" + uid +"/tasks");
    const q = await query(dbRef)
    get(q).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        
        const taskData = childSnapshot.val();
        //console.log(taskData)
        renderTaskElement(taskData.taskName, taskData.date, taskData.description, taskData.completed)
      })
    })
  } catch (error) {
    //handle
  }
}
  
const modal = document.getElementById("newTaskModal");
function renderTaskElement(name, date, description, checked) {
  // Create a new task element
  const newTask = document.createElement("div");
  newTask.className = "task";

  // Create the completion checkbox
  const completionDiv = document.createElement("div");
  completionDiv.id = "completion";
  const completionCheckbox = document.createElement("input");
  completionCheckbox.type = "checkbox";
  completionCheckbox.name = "completed";
  completionCheckbox.id = "completionCheckbox";
  completionCheckbox.checked = checked
  completionDiv.appendChild(completionCheckbox);
  newTask.appendChild(completionDiv);

  // Create and set the task name
  const nameElement = document.createElement("p");
  nameElement.id = "name";
  nameElement.textContent = name;
  newTask.appendChild(nameElement);

  // Create and set the due date
  const dateElement = document.createElement("p");
  dateElement.id = "date";
  const dateObject = new Date(date);
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
  descriptionElement.textContent = description;
  newTask.appendChild(descriptionElement);

  // Create the options button with the icon
  const optionsButton = document.createElement("button");
  optionsButton.id = "optionsBtn";
  const iconImage = document.createElement("img");
  iconImage.src = "/src/images/infoIcon.gif";
  iconImage.alt = "Icon";
  iconImage.id = "imgIcon";
  optionsButton.appendChild(iconImage);
  newTask.appendChild(optionsButton);

  // Append the new task element to the task container (adjust the container ID as needed)
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.appendChild(newTask);

  modal.style.display = "none";
}

