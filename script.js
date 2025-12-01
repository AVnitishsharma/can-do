let tasksData = {}

const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll(".task")
const toggleModalButton = document.querySelector("#toggle-modal")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector(".bg")
const addTaskBtn = document.querySelector(".add-task")
const taskTitle = document.querySelector("#task-title")
const taskDescription = document.querySelector("#task-description")
const deletebox = document.querySelector(".delete")

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  console.log(data)

  for(const col in data){
    const column = document.querySelector(`#${col}`);
    data[col].forEach(task =>{
        const div = document.createElement("div")
        div.classList.add("task")
        div.setAttribute("draggable","true")
        div.innerHTML =`
                <h2>${taskTitle.value}</h2>
                <p>${taskDescription.value}</p> `
          
        todo.appendChild(div)
    })
  }
}
let dragElement = null

// Function to update task counts in all columns
function updateTaskCounts() {
  [todo, progress, done].forEach(col => {
    const tasksInCol = col.querySelectorAll(".task")
    const count = col.querySelector(".right")
    count.innerText = tasksInCol.length;

    tasksData[col.id] = Array.from(tasks).map(t =>{
      return{
        title: t.querySelector("h2").innerText,
        description: t.querySelector("p").innerText
      }
    })
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  })
}


tasks.forEach(task => {
  task.addEventListener("drag", (e) => {
    dragElement = task
  })
});

// task dragable logic
function addDragEventOnColum(column) {
  column.addEventListener("dragenter", (e) =>{
    e.preventDefault();
    column.classList.add("hoverOver")
  })
  column.addEventListener("dragleave", (e) =>{
    e.preventDefault();
    column.classList.remove("hoverOver")
  })

  column.addEventListener("dragover", (e) =>{
    e.preventDefault();
  })
  column.addEventListener("drop", (e) =>{
    e.preventDefault();
    
    updateTaskCounts();
    column.appendChild(dragElement);
    column.classList.remove("hoverOver")

    
  })

}
addDragEventOnColum(todo);
addDragEventOnColum(progress);
addDragEventOnColum(done);

toggleModalButton.addEventListener("click", () =>{
  modal.style.display = "flex"
})
closeButton.addEventListener("click", () => {
  modal.style.display = "none"
})

// new task creater logic
addTaskBtn.addEventListener(("click"), () => {

  const div = document.createElement("div")
  div.classList.add("task")
  div.setAttribute("draggable","true")
  div.innerHTML =`
          <h2>${taskTitle.value}</h2>
          <p>${taskDescription.value}</p> `
  
  todo.appendChild(div)
  modal.style.display = "none"

  div.addEventListener("drag", (e) => {
    dragElement = div
  })

  updateTaskCounts();
})

updateTaskCounts(); // Initial count update on page load