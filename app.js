//DOM selectors to define UI variables
const form = document.querySelector('#form');
const taskInput = document.querySelector('#task');
const filterList = document.querySelector('#filter');
const taskList = document.querySelector('#taskList');
const clearBtn = document.querySelector('#clear');
const complete = document.querySelector('#completeList');

//Declare function for Event Listeners

loadEventListeners();
//load  all Event Listeners
function loadEventListeners() {
document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
complete.addEventListener('click', completeTask);
clearBtn.addEventListener('click', clearTask);
filterList.addEventListener('keyup', filterTask);
}

// Add local storage to ul
function getTasks(){
let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
tasks.forEach(function(task){
//Create list for tasks inputed
 const list = document.createElement('li');
 // Add list class
list.className = 'list-group-item';
// Append Child and create text node
list.appendChild(document.createTextNode(task));
//Create delete link
const link = document.createElement('a')
// Add link class
link.className = 'delete-item';
// Add html
link.innerHTML = '<div><i class = "fa fa-trash pl-3"></i></div>';
link.style.float = 'right';
link.style.color = 'red'
//create complete link
const link2 = document.createElement('a')
link2.className = 'complete-item';
link2.innerHTML = '<div><i class = "fa fa-check-circle"></i></div>'
link2.style.float = 'right';
link2.style.color = 'green';
// Append link to list
list.appendChild(link);
list.appendChild(link2);
// Append li to task list
taskList.appendChild(list);

    });
}

// Determine actions of event listeners
function addTask(e){
  // if task is empty
if(taskInput.value === ''){
  confirm("Add a task");
  }

//Create list for tasks inputed
 const list = document.createElement('li');
 
 // Add list class
list.className = 'list-group-item';

// Append Child and create text node
list.appendChild(document.createTextNode(taskInput.value));

//Create delete link
const link = document.createElement('a')
//Add link class
link.className = 'delete-item';
// Add html
link.innerHTML = '<div><i class = "fa fa-trash pl-3"></i></div>';
link.style.float = 'right';
link.style.color = 'red'
//create complete link
const link2 = document.createElement('a')
link2.className = 'complete-item';
link2.innerHTML = '<div><i class = "fa fa-check-circle"></i></div>'
link2.style.float = 'right';
link2.style.color = 'green';
// Append link to list
list.appendChild(link);
list.appendChild(link2);
// Append li to task list
taskList.appendChild(list);


// store in LS
storeInLocalStorage(taskInput.value);

// clear input
taskInput.value = '';
  e.preventDefault();
}

// Store in LocalStorage
function storeInLocalStorage(task){
let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
tasks = JSON.parse(localStorage.getItem('tasks'))
  }

tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Remove tasks
function removeTask(e){
  if(e.target.parentElement.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure you want to delete task?')){
      e.target.parentElement.parentElement.parentElement.remove();

      removeFromLocalStorage(e.target.parentElement.parentElement.parentElement);
    }
  } else if(e.target.parentElement.parentElement.classList.contains('complete-item')){
  let lists;
  lists = e.target.parentElement.parentElement.parentElement.textContent;

// Create Completed Task Lists
  const list2 = document.createElement('li');
  list2.className = 'list-group-item';
  list2.appendChild(document.createTextNode(lists));

// Create completed Task link
   const completeLink = document.createElement('a');
   completeLink.className ='completed';
   completeLink.innerHTML ='<i class="fa fa-thumbs-up"></i>';
   completeLink.style.color ='blue';
   completeLink.style.float ='right';
   

   list2.appendChild(completeLink);
   complete.appendChild(list2);
  e.target.parentElement.parentElement.parentElement.remove();
  }

}

function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
  tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Removing completed task
function completeTask(e){
  if(e.target.parentElement.classList.contains('completed')){
    e.target.parentElement.parentElement.remove();

      // Remove completed task from LocalStorage
      completeFromLocalStorage(e.target.parentElement.parentElement);
  }
}

//Removing Completed Task From Storage
function completeFromLocalStorage(taskItems){
  let tasks;
  if(localStorage.getItem('tasks') === null){
  tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItems.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));

}



function clearTask(){
  taskList.innerHTML = '';
  clearTaskfromLocalStorage();
}

//
function clearTaskfromLocalStorage(){
  localStorage.clear();
}

function filterTask(e){
  const text = e.target.value;

  document.querySelectorAll('.list-group-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.indexOf(text)!= -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    } 
  });
}