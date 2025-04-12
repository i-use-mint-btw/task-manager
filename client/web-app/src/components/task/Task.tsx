import { Task as TaskModel } from "../../types";
import styles from "./task.module.css";

interface IProps {
  data: TaskModel;
  onClick: (task: TaskModel) => void;
  id: string;
}

export default function Task(props: IProps) {
  let completed = 0;

  if (props.data.subtasks) {
    props.data.subtasks.forEach((subtask) => {
      if (subtask.completed) completed++;
    });
  }

  return (
    <>
      <button
        className={styles.rootContainer}
        onClick={() => props.onClick(props.data)}
      >
        <div className={styles.mainContainer}>
          <p className={styles.taskTitle}>{props.data.title}</p>
          <p className={styles.subtaskCompletionStatus}>
            {completed} of{" "}
            {props.data.subtasks ? props.data.subtasks.length : "0"} subtasks
            completed
          </p>
        </div>
      </button>
    </>
  );
}
