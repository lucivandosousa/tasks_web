import { useEffect, useState } from "react"
import Task from "../../components/Task"
import styles from "./home.module.css"

export default function Home() {

  const [tasks, setTasks] = useState([])
  const [inputTask, setInputTask] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then(response => response.json())
      .then(data => setTasks(data))
  }, [tasks])

  async function insertTask() {

    let data = {
      description: inputTask,
      concluded: "N"
    }

    if (inputTask === "") {
      alert("Você deve inserir uma descrição para a tarefa.")
      return
    }

    await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(data => data)

    setInputTask("")
  }

  return (
    <div className={styles.container_tasks}>
      <h1>Minhas Tarefas</h1>

      <div className={styles.form_task}>
        <input 
          className={styles.input_task}
          type="text"
          value={inputTask}
          placeholder="Descrição da tarefa"
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button
          className={styles.button_task}
          onClick={insertTask}
        >
          Inserir Tarefa
        </button>
      </div>
      <div>
        {
          tasks.map((task) => (
            <Task key={task.id} description={task.description} concluded={task.concluded} id_task={task.id}/>
          ))
        }
      </div>
    </div>
  )
}
