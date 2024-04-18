import styles from "./task.module.css"
import { MdDelete } from "react-icons/md"

export default function Task({ description, concluded, id_task}) {

  async function deleteTask(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE"
          })
  }

  async function updateTask(id) {

    let data = {
      description: description,
      concluded: concluded === "S" ? "N" : "S"
    }

    await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
          })
  }

  return (
    <div className={styles.task}>
      <div>
        <input 
          className={styles.task_checkbox}
          type="checkbox"
          value={concluded}
          checked={concluded === "S" ? true : false}
          onChange={() => updateTask(id_task)}
        />
        {
          concluded === "S" ? 
            <span className={styles.task_concluded}>{description}</span> 
          : 
            description
        }
      </div>
      <MdDelete className={styles.icon_red} size={24} onClick={() => deleteTask(id_task)}/>
    </div>
  )
}
