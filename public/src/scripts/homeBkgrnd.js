import { auth, database } from "./init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  ref,
  query,
  orderByChild,
  onChildAdded,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";


onAuthStateChanged(auth, (user) => {
  if (user) {
    let uid = user.uid;
    const tasksRef = ref(database, "users/" + uid + "/tasks");
    
    const userEmail = document.getElementById('currentUserEmail');
    userEmail.textContent = user.email


    onChildAdded(query(tasksRef, orderByChild("date")), (childSnapshot) => {
      const taskData = childSnapshot.val();
      const key = childSnapshot.key
      renderTaskElement(
        uid,
        key,
        taskData.taskName,
        taskData.date,
        taskData.description,
        taskData.completed
      );
    });
  }
});


function renderTaskElement(uid, key, name, date, description, checked) {
  // Create a new task element
  const newTask = document.createElement("div");
  newTask.className = "task";
  newTask.id = key;

  // Create the completion checkbox
  const completionDiv = document.createElement("div");
  completionDiv.id = "completion";
  const completionCheckbox = document.createElement("input");
  completionCheckbox.type = "checkbox";
  completionCheckbox.name = "completed";
  completionCheckbox.id = "completionCheckbox";
  completionCheckbox.checked = checked

  completionCheckbox.addEventListener("change", () => {
    updateCompletedField(uid, key, completionCheckbox.checked);
  });

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
  iconImage.src = "/src/images/trashIcon.png";
  iconImage.alt = "Icon";
  iconImage.id = "imgIcon";
  optionsButton.appendChild(iconImage);
  optionsButton.addEventListener('click', () => {
    deleteTask(uid, key)
    removeTaskFromClientSide(key)
  })
  newTask.appendChild(optionsButton);

  const taskContainer = document.getElementById("taskContainer");
  taskContainer.appendChild(newTask);
}


function updateCompletedField(uid, taskId, completed) {
  const taskRef = ref(database, "users/" + uid + "/tasks/" + taskId);
  update(taskRef, {
    completed: completed
  });
} 

function deleteTask(uid, taskId) {
  const taskRef = ref(database, "users/" + uid + "/tasks/" + taskId);
  remove(taskRef);
}

function removeTaskFromClientSide(key) {
  const task = document.getElementById(key);
  task.style.display = 'none';
}

