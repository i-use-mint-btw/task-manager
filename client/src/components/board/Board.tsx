import useGlobalState from "../../context/GlobalContext";
import { Task } from "../../types";
import TaskColumn from "../task-column/TaskColumn";
import styles from "./board.module.css";

export default function Board() {
  const { selectedBoard } = useGlobalState();

  const todo: Task[] = [];
  const doing: Task[] = [];
  const done: Task[] = [];

  selectedBoard?.tasks?.forEach((task) => {
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

  if (!selectedBoard) return <NoBoardSelected />;
  if (!selectedBoard?.tasks?.length || selectedBoard?.tasks?.length < 1) return <EmptyBoard />;

  return (
    <>
      <div className={styles.rootContainer}>
        <div className={styles.taskColumnsContainer}>
          <TaskColumn iconColor="#47c6e5" label="todo" tasks={todo} />
          <TaskColumn iconColor="#826ef2" label="Doing" tasks={doing} />
          <TaskColumn iconColor="#65e0ab" label="done" tasks={done} />
        </div>
      </div>
    </>
  );
}

function NoBoardSelected() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.placeholderTextContainer}>
        <h1 className={styles.placeholderText}>No board selected.</h1>
      </div>
    </div>
  );
}

function EmptyBoard() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.placeholderTextContainer}>
        <h1 className={styles.placeholderText}>
          There are no tasks for this board.
        </h1>
      </div>
    </div>
  );
}
