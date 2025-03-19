import { Task as TaskModel } from "../../types";
import Task from "../task/Task";
import styles from "./task-column.module.css";

interface IProps {
  label: string;
  tasks: TaskModel[];
  iconColor: string
}

export default function TaskColumn(props: IProps) {
  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.columnLabelContainer}>
            <div style={{background: props.iconColor}} className={styles.circularIcon}></div>
            <p className={styles.columnLabel}>{props.label} ({props.tasks.length})</p>
        </div>
        {props.tasks.map((task, i) => (
          <Task key={i} data={task} />
        ))}
      </div>
    </>
  );
}
