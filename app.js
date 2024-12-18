//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.querySelector("#add-item button");//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
const createNewTaskElement = (taskString) => {

    const listItem=document.createElement("li");
    listItem.className = "task-item";
    //input (checkbox)
    const checkBox=document.createElement("input");
    checkBox.type = "checkbox";
    //label
    const label=document.createElement("label");
    label.className = "task";
    label.innerText = taskString;
    //input (text)
    const editInput=document.createElement("input");
    editInput.type = "text";
    editInput.className = "task-item-input";
    editInput.style.display = "none";

    //button.edit
    const editButton=document.createElement("button");
    editButton.className = "edit";
    editButton.innerText = "Edit";

    //button.delete
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    
    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "Delete task"; 
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
};



const addTask = () => {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value.trim()) return;
    const listItem=createNewTaskElement(taskInput.value.trim());
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
};

//Edit an existing task.

const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;
    const editInput = listItem.querySelector('.task-item-input');
    const label= listItem.querySelector(".task");
    const editButton = listItem.querySelector(".edit");
    const isEditMode = listItem.classList.contains("edit-mode");
    
    if (isEditMode) {
        label.innerText = editInput.value.trim();
        editInput.style.display = "none";
        label.style.display = "block";
        editButton.innerText = "Edit";
      } else {
        alert("Task name cannot be empty!");
      } else {
        editInput.value = label.innerText;
        editInput.style.display = "block"; // Показываем поле ввода
        label.style.display = "none"; // Скрываем текст задачи
        editButton.innerText = "Save";
        listItem.classList.add("edit-mode");
    }
};


//Delete task.
const deleteTask = function () {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);//Remove the parent list item from the ul.
};


//Mark task completed
const taskCompleted = function () {
    console.log("Complete Task...");
    const listItem = this.parentNode;
    const label = listItem.querySelector(".task");

    if (label) label.classList.add("completed-tasks-label"); // Добавляем стиль
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};


const taskIncomplete = function () {
    console.log("Incomplete Task...");
   //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const listItem = this.parentNode;
    const label = listItem.querySelector(".task");
    
    if (label) label.classList.remove("completed-tasks-label"); // Удаляем стиль
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
    console.log("AJAX Request");
};

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
    console.log("bind list item events");
    const checkBox=taskListItem.querySelector("input[type=checkbox]");
    const editButton=taskListItem.querySelector(".edit");
    const deleteButton=taskListItem.querySelector(".delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

[...incompleteTaskHolder.children].forEach((item) =>
    bindTaskEvents(item, taskCompleted)
  );
  [...completedTasksHolder.children].forEach((item) =>
    bindTaskEvents(item, taskIncomplete)
  );

  addButton.addEventListener("click", () => {
    addTask(); 
    ajaxRequest();
});




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
