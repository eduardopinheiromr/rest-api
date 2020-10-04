// To know more about this api, check the README on https://github.com/eduardopinheiromr/rest-api

const url = window.location.href.toString();
const submit = document.querySelector("#submit");
const description = document.querySelector("#description");
const titleContainer = document.getElementById("list-tab");
const descriptionContainer = document.getElementById("nav-tabContent");
const todoapp_allTasks = url + "tasks";
const todoapp_taskRoute = url + "task/";

function submitEditedTask(event) {
  const id = event.target.id.split("-")[1];
  const newTitle = event.target.innerText;
  const description = document.getElementById(`list-${id}`).innerText;
  const todoapp_putTask = todoapp_taskRoute + id;

  fetch(todoapp_putTask, {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      titulo: newTitle,
      descricao: description,
      status: "to-do",
    }),
  }).then(console.log("Tarefa editada com sucesso :)"));
}

function submitEditedTaskDescription(event) {
  const id = event.target.id.split("-")[1];
  const title = document.getElementById(`titulo-${id}`).innerText;
  const newDescription = event.target.innerText;
  const todoapp_putTask = todoapp_taskRoute + id;

  fetch(todoapp_putTask, {
    method: "PUT",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ titulo: title, descricao: newDescription }),
  }).then(console.log("Tarefa editada com sucesso :)"));
}

function editTask(element) {
  let id = element.dataset.id;
  let title = document.querySelector(`#titulo-${id}`);
  let lastEdit = title.innerText;
  title.setAttribute("contenteditable", "true");
  title.focus();
  title.addEventListener("focusout", () => {
    let newEdit = title.innerText;

    if (lastEdit !== newEdit) {
      submitEditedTask(event);
    }
  });
}

function editTaskDescription(element) {
  let id = element.dataset.id;
  let description = document.querySelector(`#list-${id}`);
  let lastEdit = description.innerText;
  description.setAttribute("contenteditable", "true");
  description.focus();
  description.addEventListener("focusout", () => {
    let newEdit = description.innerText;

    if (lastEdit !== newEdit) {
      submitEditedTaskDescription(event);
    }
  });
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
    let { id, titulo, descricao, status } = task;
    if (descricao.length === 0) {
      descricao = "Clique aqui para adicionar uma descrição a tarefa...";
    }
    const statusStyle = selectStatusClass(status);
    const title = `
    <a class="task task-${id} list-group-item list-group-item-action ${statusStyle.title}" role="tab" aria-controls="home" id="list-home-list" data-toggle="list" href="#list-${id}">
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

    const description = `<div class="${statusStyle.description}tab-pane fade" id="list-${id}" role="tabpanel" aria-labelledby="list-home-list" data-id="${id}" onclick="editTaskDescription(this)">${descricao}</div>`;

    titleContainer.innerHTML += title;
    descriptionContainer.innerHTML += description;
  });
}

function reloadTasks(lastMove, id) {
  if (lastMove === "put") {
    console.log(lastMove);
  } else if (lastMove === "post") {
    console.log(lastMove);
  } else if (lastMove === "delete") {
    const title = document.querySelector(`.task-${id}`);
    const description = document.querySelector(`#list-${id}`);

    title.style.display = description.style.display = "none";
  }
}

function deleteTask(idName) {
  let id = idName.split("-");
  id = id[id.length - 1];

  let deleteConfirmation = confirm("Tem deseja que deseja excluir esta nota?");

  if (deleteConfirmation == true) {
    fetch(`${todoapp_taskRoute}${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then(reloadTasks("delete", id));
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
