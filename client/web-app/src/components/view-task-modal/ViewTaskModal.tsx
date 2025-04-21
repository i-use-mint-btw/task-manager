import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task, TaskStatus } from "../../types";
import Modal from "../modal/Modal";
import styles from "./view-task-modal.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Subtask from "../subtask/Subtask";
import { API_URL } from "../../constants";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  data: Task;
  onOutOfBoundsClick: () => void;
  boardID: string;
  onNewResourceAdded: Dispatch<SetStateAction<number>>;
}

export default function ViewTaskModal(props: IProps) {
  let completedCount = 0;

  if (props.data.subtasks) {
    props.data.subtasks.forEach((subtask) => {
      if (subtask.completed) completedCount++;
    });
  }

  const [status, setStatus] = useState<TaskStatus>(
    props.data.status && props.data.status
  );

  async function handleModalOutOfBoundsClick() {
    try {
      const res = await fetch(
        API_URL + "/boards/" + props.boardID + "/tasks/" + props.data.id,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            title: props.data.title,
            description: props.data.description
              ? props.data.description
              : "No description",
            status: status.toLocaleLowerCase(),
            subtasks: props.data.subtasks
              ? props.data.subtasks.map((subtask) => {
                  if (status.toLocaleLowerCase() === "done")
                    return {
                      id: subtask.id,
                      title: subtask.title,
                      completed: true,
                    };
                  return {
                    id: subtask.id,
                    title: subtask.title,
                    completed: subtask.completed,
                  };
                })
              : [],
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Error when making request");
      }

      setStatus(props.data.status);
      props.onOutOfBoundsClick();
      props.onNewResourceAdded((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Modal
        onOutOfBoundsClick={handleModalOutOfBoundsClick}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.rootContainer}
        >
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{props.data.title}</h3>
            <FontAwesomeIcon
              className={styles.optionsIcon}
              icon={faEllipsisVertical}
            />
          </div>
          <p className={styles.description}>
            {props.data.description
              ? props.data.description
              : "No description added"}
          </p>
          <p className={styles.subtaskCompletionCount}>
            Subtasks ({completedCount} of{" "}
            {props.data.subtasks ? props.data.subtasks.length : "0"})
          </p>
          <div className={styles.subtasksAndStatusContainer}>
            <div className={styles.subtasksContainer}>
              {props.data.subtasks &&
                props.data.subtasks.map((subtask, i) => {
                  return <Subtask key={i} data={subtask} />;
                })}
            </div>
            <div className={styles.statusContainer}>
              <label htmlFor="Status">Status</label>
              <select
                name="Status"
                id="Status"
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                value={status}
              >
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
