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
const title = document.querySelectorAll(".title");
const edit = document.querySelectorAll(".edit-btn");
const description = document.querySelector("#description");
const todoapp_allTasks = "http://localhost:8080/tasks";
const todoapp_taskRoute = "http://localhost:8080/task/";
const titleContainer = document.getElementById("list-tab");
const descriptionContainer = document.getElementById("nav-tabContent");

// delete btn <button onclick="deleteTask(this.id)" class="delete_btn" id="delete-btn-${id}"><img src="src/img/delete.svg"></button>

function submitEditedTask(event) {
  const id = event.target.id.split("-")[1];
  const newTitle = event.target.innerText;
  const todoapp_putTask = todoapp_taskRoute + id;

  fetch(todoapp_putTask, {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      titulo: newTitle,
      descricao: "Testando",
      status: "to-do",
    }),
  }).then(console.log("Tarefa editada com sucesso :)"));
}

async function editTask(element) {
  let id = element.dataset.id;
  let title = document.querySelector(`#titulo-${id}`);
  title.setAttribute("contenteditable", "true");
  title.focus();
  title.addEventListener("focusout", submitEditedTask);
}

async function requestAPI(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

async function renderAllTasks() {
  console.log("Tarefas renderizadas no front");

  const data = await requestAPI(todoapp_allTasks);
  const taskList = data.results;

  taskList.forEach((task) => {
    const { id, titulo, descricao, status } = task;

    const statusStyle = selectStatusClass(status);
    const title = `
    <a class="task list-group-item list-group-item-action ${statusStyle.title}" role="tab" aria-controls="home" id="list-home-list" data-toggle="list" href="#list-${id}">
      <div>
        <span class="title" id="titulo-${id}">${titulo}</span>
        <div>
          <button data-id="${id}" onclick="editTask(this)" class="edit_btn" id="edit-btn-${id}">
            <img src="src/img/edit.svg">
          </button>
          <button onclick="deleteTask(this.id)" class="delete_btn" id="delete-btn-${id}">
            <img src="src/img/delete.svg">
          </button>
        </div>
      </div>
    </a>`;

    const description = `<div class="${statusStyle.description}tab-pane fade" id="list-${id}" role="tabpanel" aria-labelledby="list-home-list">${descricao}</div>`;

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
