import { Board as BoardModel, Task } from "../../types";
import TaskColumn from "../task-column/TaskColumn";
import styles from "./board.module.css";

interface IProps {
  data: BoardModel;
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

/*   function dummyTasks() {
    const t: Task = {} as Task
    const ts: Task[] = []
 
    for (let i = 0; i < 20; i++) {
      t.boardID = "d9w94je29r8eut8r9eifgyufie98ru"
      t.id = 39403
      t.description = "dofijiwoiurjkorifu"
      t.status = "done"
      t.title = "difje9jr9fg9rfj8uirif"
      t.subtasks = []
      ts.push(t)
    }

    return ts
  } */

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
          <>
            <TaskColumn iconColor="#47c6e5" label="todo" tasks={todo} />
            <TaskColumn iconColor="#826ef2" label="Doing" tasks={doing} />
            <TaskColumn iconColor="#65e0ab" label="done" tasks={done} />
            {/* <TaskColumn iconColor="#9339c4" label="test" tasks={dummyTasks()} /> */}
          </>
        )}
      </div>
    </>
  );
}
