const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === '') { // Use trim to remove extra whitespace
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value.trim(); // Set textContent to avoid HTML injection
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        
        saveData(); // Save data to local storage after adding a task
    }
    inputBox.value = ""; // Clear input after adding task
}

// Toggle task completion and remove task when span (delete button) is clicked
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData(); // Save data after modifying tasks
});

// Function to save current list state to local storage
function saveData() {
    localStorage.setItem("todoList", listContainer.innerHTML);
}

// Function to load and display tasks from local storage when page loads
function loadTasks() {
    const savedTasks = localStorage.getItem("todoList");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
}

// Call loadTasks() when the page finishes loading
document.addEventListener("DOMContentLoaded", loadTasks);
