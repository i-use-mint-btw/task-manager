import { Task as TaskModel } from "../../types";
import styles from "./task.module.css"

interface IProps {
    data: TaskModel
}

export default function Task(props: IProps) {
    return (
        <>
            <div className={styles.rootContainer}>
                <div className={styles.mainContainer}>
                    <p className={styles.taskTitle}>{props.data.title}</p>
                    <p className={styles.subtaskCompletionStatus}>0 of 3 subtasks</p>
                </div>
            </div>
        </>
    )
}