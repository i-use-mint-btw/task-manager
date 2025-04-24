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

  return (
    <>
      <div className={styles.rootContainer}>
        {!selectedBoard?.tasks?.length || selectedBoard?.tasks?.length < 1 ? (
          <div className={styles.placeholderTextContainer}>
            <h1 className={styles.placeholderText}>
              There are no tasks for this board.
            </h1>
          </div>
        ) : (
          <div className={styles.taskColumnsContainer}>
            <TaskColumn
              iconColor="#47c6e5"
              label="todo"
              tasks={todo}
            />
            <TaskColumn
              iconColor="#826ef2"
              label="Doing"
              tasks={doing}
            />
            <TaskColumn
              iconColor="#65e0ab"
              label="done"
              tasks={done}
            />
          </div>
        )}
      </div>
    </>
  );
}
