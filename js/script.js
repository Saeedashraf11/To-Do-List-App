/////////////////select elements///////////////////////////////////////////

var addBtn = document.getElementById("addBtn");
var taskInput = document.getElementById("taskInput");
var mySelect = document.getElementById("mySelect");
var searchInput = document.getElementById("searchInput");

///////////////////////////////////////////////add todo////////////////////////////////////////////////////

addBtn.onclick = addTodo;
var todos = [];

if (localStorage.getItem("allTodos") != null) {
  todos = JSON.parse(localStorage.getItem("allTodos"));
  displayData(todos);
}
function addTodo() {
  var task = {
    taskDetails: taskInput.value,
    isCompleted: false,
    id: `${Math.random() * 10000}-${Math.random() * 10000}`,
  };
  todos.push(task);
  clear();
  localStorage.setItem("allTodos", JSON.stringify(todos));
  console.log(todos);
  displayData(todos);
}
////////////////////////////////////display data////////////////////////////////////////
function displayData(arr) {
  var cartoona = "";
  for (var task of arr) {
    cartoona += `<div class="tasks my-3 rounded text-light d-flex justify-content-between px-3 py-2 align-items-center ${
      task.isCompleted == true ? "bg-task" : ""
    }">
 <div class="task d-flex">
     <i class="fa-regular fa-circle-check" onclick="beCompleted('${
       task.id
     }')"></i>
     <p class="task-text m-0 p-0 align-self-center ${
       task.isCompleted == true ? "completed" : ""
     } ">${task.taskDetails}</p>
 </div>
 <div>
     <i class="fa-solid fa-trash mx-2" onclick="deleteTodo('${task.id}')"></i>
 </div> 
 </div>`;
  }
  document.getElementById("tasks").innerHTML = cartoona;
}
/////////////////////////////////////////completed /////////////////////////////////////////////////////
function beCompleted(id) {
  console.log(id);
  var foundedIndex = todos.findIndex(function (task) {
    return task.id == id;
  });
  todos[foundedIndex].isCompleted =
    todos[foundedIndex].isCompleted == true ? false : true;
  localStorage.setItem("allTodos", JSON.stringify(todos));
  displayAccordingSelectValue();
}
///////////////////////////////////////////displayAccordingSelectValue////////////////////////////////////////

mySelect.onchange = function () {
  displayAccordingSelectValue();
};

function displayAccordingSelectValue() {
  var selectedValue = mySelect.options[mySelect.options.selectedIndex].value;
  switch (selectedValue) {
    case "all":
      displayData(todos);
      break;
    case "completed":
      var completedTask = todos.filter(function (task) {
        return task.isCompleted == true;
      });
      displayData(completedTask);
      break;
    case "uncompleted":
      var unCompletedTask = todos.filter(function (task) {
        return task.isCompleted == false;
      });
      displayData(unCompletedTask);
      break;
  }
}
//////////////////////////////////delete todo/////////////////////////////////////////////////////////////////
function deleteTodo(id) {
  var foundedIndex = todos.findIndex(function (task) {
    return task.id == id;
  });
  todos.splice(foundedIndex, 1);
  displayData(todos);
  localStorage.setItem("allTodos", JSON.stringify(todos));
}
////////////////////////////////////search////////////////////////////////////////////////////////////////////
searchInput.oninput = function (e) {
  console.log(e.target.value);
  var searchArr = [];
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].taskDetails.includes(e.target.value)) {
      searchArr.push(todos[i]);
    }
  }
  displayData(searchArr);
};

//////////////////////////////////clear////////////////////////////////////////////////////
function clear() {
  taskInput.value = "";
}
