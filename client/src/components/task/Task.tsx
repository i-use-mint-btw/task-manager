import { Modals } from "../../constants";
import useGlobalState from "../../context/GlobalContext";
import { Task as TaskModel } from "../../types";
import styles from "./task.module.css";

interface IProps {
  data: TaskModel;
  id: string;
}

export default function Task(props: IProps) {
  let completed = 0;

  if (props.data.subtasks) {
    props.data.subtasks.forEach((subtask) => {
      if (subtask.completed) completed++;
    });
  }

  const {setSelectedTask, setActiveModal} = useGlobalState()

  function handleTaskClick() {
    setSelectedTask(props.data)
    setActiveModal(Modals.VIEW_TASK)
  }

  return (
    <>
      <button
        className={styles.rootContainer}
        onClick={handleTaskClick}
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
