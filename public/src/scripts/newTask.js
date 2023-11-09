
const container = document.getElementById('taskContainer')

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

createTaskBtn.addEventListener('click', () => {
    const taskName = document.getElementById("taskName").value;
    const date = document.getElementById("dueDate").value;
    const description = document.getElementById("newTaskDescrip").value;
    
    createTaskElement(taskName, date, description);
})

function createTaskElement(name, date, description) {
    // Create a new task element
    const newTask = document.createElement("div");
    newTask.className = "task";
  
    // Create the completion checkbox
    const completionDiv = document.createElement("div");
    completionDiv.id = "completion"
    const completionCheckbox = document.createElement("input");
    completionCheckbox.type = "checkbox";
    completionCheckbox.name = "completed";
    completionCheckbox.id = "completionCheckbox";
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
    const dateObject = new Date(date)
    dateElement.textContent = `${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}/${dateObject.getFullYear()}`;
    console.log(dateElement.textContent)
    newTask.appendChild(dateElement);
  
    // Create and set the task description
    const descriptionElement = document.createElement("p");
    descriptionElement.id = "description";
    descriptionElement.textContent = description;
    newTask.appendChild(descriptionElement);
  
    // Create the options button with the icon
    const optionsButton = document.createElement("button");
    optionsButton.id = "optionsBtn"
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
  