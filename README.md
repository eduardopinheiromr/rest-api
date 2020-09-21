# ToDoApp - Rest API with view

![App preview](https://i.ibb.co/gZ6Rckf/Fire-Shot-Capture-003-API-To-Do-App-localhost.png)

This is a project created to learn how to develop REST APIs, using [Node.Js](https://nodejs.org/pt-br/download/), with [Express.js](https://expressjs.com/pt-br/) and [SQLite](https://www.sqlite.org/index.html).

## How to use

To use the project, it is necessary to have installed [Node.Js](https://nodejs.org/pt-br/download/)

Download the project by executing the command below
`git clone https://github.com/eduardopinheiromr/rest-api.git`

When downloading, in the main directory, execute the command
`npm install`

When you finish downloading and installing the packages, run
`nodemon server.js`

The server will start at the url http://localhost:8080/

## API routes

### Method GET

To return all tasks from database in JSON
`http://localhost:8080/tasks`

To return a specific task, use the route `task/id`, example
`http://localhost:8080/task/1`

### Method DELETE

To delete a task, use the route `task/id`, example
`http://localhost:8080/1`

### Method POST

To create a new task, send the content in body with post
`http://localhost:8080/new-task `

### Method PUT

To edit a task, use the route `task/id`, example
`http://localhost:8080/1 `

_BODY OF OBJECT NEEDS TITLE AND DESCRIPTION FOR **POST** AND **PUT**_
