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
  const titleContainer = document.getElementById("list-tab");
  const descriptionContainer = document.getElementById("nav-tabContent");

  const data = await requestAPI(todoapp_allTasks);
  const taskList = data.results;

  taskList.forEach((task) => {
    const { id, titulo, descricao, status } = task;

    const statusStyle = selectStatusClass(status);
    const title = `<a class="${statusStyle.title} list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-${id}" role="tab" aria-controls="home">${titulo}</a>`;
    const description = `<div class="${statusStyle.description}tab-pane fade" id="list-${id}" role="tabpanel" aria-labelledby="list-home-list">${descricao}</div>`;

    titleContainer.innerHTML += title;
    descriptionContainer.innerHTML += description;
  });
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
