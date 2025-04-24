import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Task, TaskStatus } from "../../types";
import Modal from "../modal/Modal";
import styles from "./view-task-modal.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Subtask from "../subtask/Subtask";
import { useState } from "react";
import { updateTaskByID } from "../../api";
import useGlobalState from "../../context/GlobalContext";
import { Modals } from "../../constants";

export default function ViewTaskModal() {
  const {selectedTask, selectedBoard, activeModal, setActiveModal, forceRefetch} = useGlobalState()
  const [status, setStatus] = useState<TaskStatus>(selectedTask?.status ?? "todo");

  let completedSubtasks = 0;

  if (selectedTask?.subtasks) {
    selectedTask?.subtasks.forEach((subtask) => {
      if (subtask.completed) completedSubtasks++;
    });
  }

  async function handleModalOutOfBoundsClick() {
    if (!selectedBoard) return

    try {
      const res = await updateTaskByID(selectedBoard.id, {...selectedTask, status: status} as Task)
      if (!res.ok) throw Error("Failed to update task " + res.statusText)

      setActiveModal(Modals.NONE)
      forceRefetch()
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Modal
        visible={activeModal === Modals.VIEW_TASK}
        onOutOfBoundsClick={handleModalOutOfBoundsClick}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.rootContainer}
        >
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{selectedTask?.title}</h3>
            <FontAwesomeIcon
              className={styles.optionsIcon}
              icon={faEllipsisVertical}
            />
          </div>
          <p className={styles.description}>
            {selectedTask?.description ?? "No description added"}
          </p>
          <p className={styles.subtaskCompletionCount}>
            Subtasks ({completedSubtasks} of{" "}
            {selectedTask?.subtasks?.length ?? "0"})
          </p>
          <div className={styles.subtasksAndStatusContainer}>
            <div className={styles.subtasksContainer}>
              {selectedTask?.subtasks &&
                selectedTask?.subtasks.map((subtask, i) => {
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
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}