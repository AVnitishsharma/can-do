const todo = document.querySelector("#todo")
const progres = document.querySelector("#progress")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll(".task")
const toggleModalButton = document.querySelector("#toggle-modal")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector(".bg")
const addTaskBtn = document.querySelector(".add-task")


let dragElement = null

tasks.forEach(task => {
  task.addEventListener("drag", (e) => {
    dragElement = task
  })
});

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
    column.appendChild(dragElement);
    column.classList.remove("hoverOver")
  })

}
addDragEventOnColum(todo);
addDragEventOnColum(progres);
addDragEventOnColum(done);

toggleModalButton.addEventListener("click", () =>{
  modal.style.display = "flex"
})
closeButton.addEventListener("click", () => {
  modal.style.display = "none"
})

addTaskBtn.addEventListener(("click"), () => {
  const taskTitle = document.querySelector("#task-title")
  const taskDescription = document.querySelector("#task-description")
  const div = document.createElement("div")
  div.classList.add("task")
  div.setAttribute("draggable","true")
  console.log(taskTitle)
  div.innerHTML =`
          <h2>${taskTitle}</h2>
          <p>${taskDescription}</p> `
  
  todo.appendChild(div)
  modal.style.display = "none"

  div.addEventListener("drag", (e) => {
    dragElement = div
  })
})