// ENDPOINTS

// GET
// http://localhost:8080/tasks - RETURN ALL TASKS IN JSON
// http://localhost:8080/task/1 - RETURN TASK THAT ID IS EQUAL TO 1

// POST
// http://localhost:8080/new-task - CREATE A NEW TASK
// BODY OF OBJECT NEEDS TITLE, DESCRIPTION AND STATUS

// PUT
// http://localhost:8080/1 - EDIT A TASK THAT ID IS EQUAL TO 1
// BODY OF OBJECT NEEDS TITLE, DESCRIPTION AND STATUS

// DELETE
// http://localhost:8080/1 - DELETE A TASK THAT ID IS EQUAL TO 1

const submit = document.querySelector("#submit");
const description = document.querySelector("#description");
const todoapp_allTasks = "http://localhost:8080/tasks";
const titleContainer = document.getElementById("list-tab");
const descriptionContainer = document.getElementById("nav-tabContent");

// delete btn <button onclick="deleteTask(this.id)" class="delete_btn" id="delete-btn-${id}"><img src="src/img/delete.svg"></button>

submit.addEventListener("click", postTask);
async function postTask() {
  //...
}

async function requestAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

async function printResult() {
  console.log(await requestAPI(todoapp_allTasks));
}

async function renderAllTasks() {
  console.log("Tarefas renderizadas no front");

  const data = await requestAPI(todoapp_allTasks);
  const taskList = data.results;

  taskList.forEach((task) => {
    const { id, titulo, descricao, status } = task;

    const statusStyle = selectStatusClass(status);
    const title = `<a class="task list-group-item list-group-item-action ${statusStyle.title}" role="tab" aria-controls="home" id="list-home-list" data-toggle="list" href="#list-${id}"><div>${titulo}<div><button onclick="editTask(this.id)" class="edit_btn" id="edit-btn-${id}"><img src="src/img/edit.svg"></button><button onclick="deleteTask(this.id)" class="delete_btn" id="delete-btn-${id}"><img src="src/img/delete.svg"></button></div></div></a>`;
    const description = `<div class="${statusStyle.description}tab-pane fade" id="list-${id}" role="tabpanel" aria-labelledby="list-home-list">${descricao}</div>`;
    // future implementation <button onclick="openMenu(this.id)" class="toggle-menu" id="toggle-menu${id}"><img src="src/img/menu.svg"></button></div><div class="toggle-menu-options"></div>
    titleContainer.innerHTML += title;
    descriptionContainer.innerHTML += description;
  });
}

function reloadTasks() {
  titleContainer.innerHTML = "";
  descriptionContainer.innerHTML = "";

  renderAllTasks();
}

function openMenu(id) {
  console.log(id);
}
// const deleteBtn = document.querySelector(".delete-btn");

// deleteBtn.addEventListener("click", deleteTask);

function deleteTask(idName) {
  let id = idName.split("-");
  id = id[id.length - 1];

  let deleteConfirmation = confirm("Tem deseja que deseja excluir esta nota?");

  if (deleteConfirmation == true) {
    fetch(`http://localhost:8080/task/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then(reloadTasks());
  }
}

function selectStatusClass(status) {
  let titleClass = "";
  let descriptionClass = "";
  if (status === "to-do") {
    titleClass = "title__to-do";
    descriptionClass = "description__to-do";
  } else if (status === "doing") {
    titleClass = "title__doing";
    descriptionClass = "description__doing";
  } else if (status === "done") {
    titleClass = "title__done";
    descriptionClass = "description__done";
  }
  return {
    title: titleClass,
    description: descriptionClass,
  };
}

renderAllTasks();
