
//Basic form DOM elements

const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");
var taskInput = document.getElementById("taskInput");
var tasklist = document.querySelector("#tasklist > ul");

var dueDateInput = document.getElementById("dueDateInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");
var statusInput = document.getElementById("statusInput");
var completionTimeInput = document.getElementById("completionTimeInput");


// Create submission event listener

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let status = statusInput.value;
    let completionTime = completionTimeInput.value;
    let estimatedTime = estimatedTimeInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    if (task) {
        addTask(task, dueDate, estimatedTime, priorityRating, completionTime, status, false);
    }
})

// Create array to track tasks

var taskListArray = [];

// Function to add task with user inputs as parameters

function addTask(taskDescription, dueDate, estimatedTime, priorityRating, completionTime, status) {
    let d = new Date();
    let dateCreated = d.getFullYear();
    let task = {
        id: Date.now(),
        taskDescription,
        dueDate,
        dateCreated,
        estimatedTime,
        priorityRating,
        completionTime,
        status
    };
    taskListArray.push(task);
    console.log(taskListArray);
    renderTask(task);
}

// Display task on screen

function renderTask(task) {

    // Call function - checks if a task has been added

    updateEmpty();

    // Create HTML elements

    let item = document.createElement("ul");
    item.setAttribute('data-id', task.id);
    item.innerHTML = "<p>" + task.taskDescription + "</p>";

    tasklist.appendChild(item);

    // Extra Task DOM elements

    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete Task");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);


    // Event Listeners for DOM elements

    delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex(task => task.id === Number(id));
        removeItemFromArray(taskListArray, index)
        console.log(taskListArray);
        updateEmpty();
        item.remove();
    })

    // Clear the input form

    form.reset();
}

// Function to remove item from array

function removeItemFromArray(arr, index) {
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}


// Function to hide the 'you haven't added any tasks' text

function updateEmpty() {
    if (taskListArray.length > 0) {
        document.getElementById('emptyList').style.display = 'none';
    } else {
        document.getElementById('emptyList').style.display = 'block';
    }
} 
