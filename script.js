// Initialize an empty task list
var taskList = [];

// Add event listener to the form for adding new tasks
document.getElementById("formNewTask").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    var taskText = document.getElementById("inputNewTask").value;

    // Create a new task item
    var newTaskItem = {
        id: taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1, // Set the ID of the new task item
        completed: false,
        text: taskText
    };

    // Add the new task to the task list
    taskList.push(newTaskItem);

    // Save the updated task list to local storage
    localStorage.setItem("taskList", JSON.stringify(taskList));

    // Create a new task element in the DOM
    createTaskElement(newTaskItem);
});

// Function to get the data from local storage
function getData() {
    var data = JSON.parse(localStorage.getItem("taskList"));

    if (data && data.length > 0) {
        console.log("Data retrieved", data);
        taskList = data;
        data.forEach(task => {
            createTaskElement(task);
        });
    } else {
        console.log("No data found", data);
    }
}

// Load data from local storage when the page loads
getData();

// Function to create a new task element in the DOM
function createTaskElement(task) {
    // Create new elements for the task
    var taskItem = document.createElement("li");
    var taskLabel = document.createElement("label");
    var taskCheckbox = document.createElement("input");
    var taskText = document.createElement("span");
    var taskEditButton = document.createElement("button");
    var taskDeleteButton = document.createElement("button");

    // Set attributes and values for the new elements
    taskItem.id = 'task:' + task.id;
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;
    taskText.innerText = task.text;
    taskEditButton.innerHTML = '<img class="icon" src="/imgs/icons8-edit-100.png">';
    taskEditButton.disabled = task.completed;
    taskDeleteButton.innerHTML = '<img class="icon" src="/imgs/icons8-delete-100.png">';

    // Add event listeners to the new elements
    taskCheckbox.addEventListener("change", () => {
        task.completed = !task.completed;
        localStorage.setItem("taskList", JSON.stringify(taskList));
        taskEditButton.disabled = task.completed;
        console.log("Task completed", taskCheckbox.checked);
    });

    taskEditButton.addEventListener("click", () => {
        taskCheckbox.disabled = true;
        taskEditButton.disabled = true;
        taskText.contentEditable = true;
        taskText.focus();
    });

    taskDeleteButton.addEventListener("click", () => {
        taskItem.remove();
        var index = taskList.findIndex((i) => i.text === task.text);
        taskList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    });

    taskText.addEventListener("focusout", () => {
        saveTaskEdit(task, taskText, taskCheckbox, taskEditButton);
    });

    taskText.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            saveTaskEdit(task, taskText, taskCheckbox, taskEditButton);
        }
    });

    // Append the new elements to the task item
    taskLabel.appendChild(taskCheckbox);
    taskLabel.appendChild(taskText);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(taskEditButton);
    taskItem.appendChild(taskDeleteButton);

    // Insert the new task item at the beginning of the list
    var taskListElement = document.getElementById("List");
    taskListElement.insertBefore(taskItem, taskListElement.firstChild);
}

// Function to save the edited task
function saveTaskEdit(task, taskText, taskCheckbox, taskEditButton) {
    taskCheckbox.disabled = false;
    taskEditButton.disabled = false;
    taskText.contentEditable = false;
    task.text = taskText.innerText;
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Add event listener to the button for deleting completed tasks
document.getElementById("btnDeleteTasks").addEventListener("click", () => {
    taskList = taskList.filter(task => !task.completed);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    document.querySelectorAll("#List li").forEach(taskItem => {
        if (taskItem.querySelector("input[type='checkbox']").checked) {
            taskItem.remove();
        }
    });
});