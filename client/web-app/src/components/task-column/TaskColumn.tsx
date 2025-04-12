import { Task as TaskModel } from "../../types";
import Task from "../task/Task";
import styles from "./task-column.module.css";

interface IProps {
  label: string;
  tasks: TaskModel[];
  iconColor: string
  onTaskClick: (task: TaskModel) => void
}

export default function TaskColumn(props: IProps) {
  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.columnLabelContainer}>
            <div style={{background: props.iconColor}} className={styles.circularIcon}></div>
            <p className={styles.columnLabel}>{props.label} ({props.tasks.length})</p>
        </div>
        <div className={styles.taskList}>
          {props.tasks.map((task, i) => (
            <Task id={task.id} key={i} data={task} onClick={props.onTaskClick} />
          ))}
        </div>
      </div>
    </>
  );
}
