import { Board as BoardModel, Task } from "../../types";
import TaskColumn from "../task-column/TaskColumn";
import styles from "./board.module.css";

interface IProps {
  data: BoardModel;
  onTaskClick: (task: Task) => void
}

export default function Board(props: IProps) {
  const todo: Task[] = [];
  const doing: Task[] = [];
  const done: Task[] = [];

  props.data.tasks?.forEach((task) => {
    switch (task.status) {
      case "todo":
        todo.push(task);
        break;
      case "doing":
        doing.push(task);
        break;
      case "done":
        done.push(task);
        break;
    }
  });

  return (
    <>
      <div className={styles.rootContainer}>
        {!props.data.tasks?.length || props.data.tasks?.length < 1 ? (
          <div className={styles.placeholderTextContainer}>
            <h1 className={styles.placeholderText}>
              There are no tasks for this board.
            </h1>
          </div>
        ) : (
          <div className={styles.taskColumnsContainer}>
            <TaskColumn iconColor="#47c6e5" label="todo" tasks={todo} onTaskClick={props.onTaskClick} />
            <TaskColumn iconColor="#826ef2" label="Doing" tasks={doing} onTaskClick={props.onTaskClick} />
            <TaskColumn iconColor="#65e0ab" label="done" tasks={done} onTaskClick={props.onTaskClick} />
          </div>
        )}
      </div>
    </>
  );
}
