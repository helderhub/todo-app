var taskList = [];

document.getElementById("formNewTask").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    taskList.push(task);

    var task = document.getElementById("inputNewTask").value;

    localStorage.setItem("tasks", JSON.stringify(taskList)); // Save the data to local storage

    newTask(task);
});

function getData() { // Function to get the data from local storage
    var data = localStorage.getItem("tasks");
    if (data) {
        console.log("Data retrieved", data);
    } else {
        console.log("No data found");
    }
}


function newTask(task) {

    // Create new elements on DOM
    var newTask = document.createElement("li");
    var newTaskLabel = document.createElement("label");
    var newTaskCheckbox = document.createElement("input");
    var newTaskText = document.createElement("span"); // Create a new span element to hold the task text
    var newTaskEdit = document.createElement("button"); // Create a new button element to edit the task
    var newTaskDelete = document.createElement("button"); // Create a new button element to delete the task

    // Set the type of the input elements 
    newTaskCheckbox.type = "checkbox";
    newTaskText.type = "text";

    newTaskText.innerText = task; // Set the value of the new task text element
    newTaskEdit.innerHTML = '<img class="icon" src="/imgs/icons8-edit-100.png"></img>'; // Set the value of the new task edit button to a pencil emoji
    newTaskDelete.innerHTML = '<img class="icon" src="/imgs/icons8-edit-100.png"></img>'; // Set the value of the new task delete button to a garbage emoji

    // Append the new task elements to the DOM
    newTaskLabel.appendChild(newTaskCheckbox);
    newTaskLabel.appendChild(newTaskText);
    newTask.appendChild(newTaskLabel);
    newTask.appendChild(newTaskEdit);
    newTask.appendChild(newTaskDelete);

    // Append the new task to the task list
    var taskList = document.getElementById("taskList");
    //taskList.appendChild(newTask); // Append the new task to the end of the list

    // Insert the new task at the beginning of the list
    taskList.insertBefore(newTask, taskList.firstChild);


    // Add event listeners to the new task elements
    newTaskDelete.addEventListener("click", () => {
        newTask.remove();
    });

    newTaskEdit.addEventListener("click", () => {
        newTaskCheckbox.disabled = true;
        newTaskEdit.disabled = true;
        newTaskText.contentEditable = true;
    });

    newTaskText.addEventListener("focusout", () => {
        newTaskCheckbox.disabled = false;
        newTaskEdit.disabled = false;
        newTaskText.contentEditable = false;
    });

    newTaskText.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            newTaskCheckbox.disabled = false;
            newTaskEdit.disabled = false;
            newTaskText.contentEditable = false;
        }
    });

}
