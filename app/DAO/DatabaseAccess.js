class DatabaseAccess {
  constructor(db) {
    this._db = db;
  }

  getAllTasks() {
    return new Promise((resolve, reject) => {
      this._db.all("SELECT * FROM TAREFAS", (err, rows) => {
        if (err) {
          console.log(err);
          return reject("Não foi possível listar as tarefas.");
        }

        return resolve(JSON.stringify({ results: rows }));
      });
    });
  }

  getTaskBy(id) {
    return new Promise((resolve, reject) => {
      this._db.all("SELECT * FROM tarefas WHERE id = ?", [id], (err, rows) => {
        if (err) {
          console.log(err);
          return reject("Não foi possível listar a tarefa.");
        }
        return resolve(JSON.stringify({ results: rows }));
      });
    });
  }

  deleteTaskBy(id) {
    return new Promise((resolve, reject) => {
      this._db.run("DELETE FROM tarefas WHERE id = ?", [id], (err) => {
        if (err) {
          console.log(err);
          return reject("Não foi possível deletar a tarefa.");
        }
        return resolve(`Tarefa ${id} foi deletada com sucesso`);
      });
    });
  }

  editTaskBy(id, content) {
    return new Promise((resolve, reject) => {
      const { titulo, descricao, status } = content;
      this._db.run(
        "UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?",
        [titulo, descricao, status, id],
        (err) => {
          if (err) {
            console.log(err);
            return reject("Não foi possível editar a tarefa.");
          }
          return resolve(`Tarefa ${id} foi alterada com sucesso`);
        }
      );
    });
  }

  createTask(content) {
    console.log(content);
    return new Promise((resolve, reject) => {
      const { titulo, descricao, status } = content;
      this._db.run(
        `INSERT INTO tarefas (titulo,descricao,status) VALUES(?,?,?)`,
        [titulo, descricao, status],
        (err) => {
          if (err) {
            console.log(err);
            return reject("Não foi possível adicionar a tarefa");
          }
          return resolve(`Tarefa adicionada com sucesso.`);
        }
      );
    });
  }

  showTables() {
    db.run("");
  }

  closeDatabase() {
    this._db.close((err) => {
      console.log("Banco encerrado com sucesso!");
      process.exit(0);
    });
  }
}

module.exports = DatabaseAccess;
