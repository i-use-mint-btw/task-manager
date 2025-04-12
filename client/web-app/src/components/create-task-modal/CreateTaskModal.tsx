import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../button/Button";
import CreateSubtask from "../create-subtask/CreateSubtask";
import ModalShell from "../modal-shell/ModalShell";
import styles from "./create-task-modal.module.css";
import { API_URL } from "../../constants";
import { CreateSubtask as CreateSubtaskModel } from "../../types";

interface IProps {
  visible: boolean;
  toggleVisibility: () => void;
  onOutOfBoundsClick: () => void;
  onNewResourceAdded: Dispatch<SetStateAction<number>>;
  boardID: string;
}

export default function CreateTaskModal(props: IProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("todo");
  const [timesSubmitted, setTimesSubmitted] = useState<number>(0);
  const [subtasks, setSubtasks] = useState<CreateSubtaskModel[]>([
    {
      id: 1,
      title: "",
      completed: false,
      placeholder: "e.g. Make coffee",
    },
    {
      id: 2,
      title: "",
      completed: false,
      placeholder: "e.g. Drink coffee & smile",
    },
  ]);

  function createNewTask() {
    setTimesSubmitted((prev) => prev + 1);
    props.toggleVisibility();
  }

  function handleAddNewSubtask() {
    setSubtasks(prev => {
      if (prev.length === 0) {
        return [{id: 1, completed: false, title: "", placeholder: "e.g. Add some sugar"}]
      }

      return [...prev, {id: prev[prev.length - 1].id + 1, completed: false, title: "", placeholder: "e.g. Add some sugar"}]
    })
  }

  function handleSubtaskChange(id: number, newValue: string) {
    setSubtasks((prev) => {
      prev[id - 1].title = newValue;
      return prev;
    });
  }

  function handleSubtaskRemoval(id: number) {
    setSubtasks(prevSubtasks => {
      return prevSubtasks.filter(prevSubtask => prevSubtask.id !== id)
    });
    console.log(subtasks);
  }

  useEffect(() => {
    if (timesSubmitted === 0) {
      return;
    }

    async function createTask() {
      try {
        const res = await fetch(
          API_URL + "/boards/" + props.boardID + "/tasks",
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              title: title,
              description: description,
              status: status,
              subtasks: subtasks,
            }),
          }
        );

        if (res.status !== 201) {
          throw new Error("Error when making request");
        }

        props.onNewResourceAdded((prev) => prev + 1);
      } catch (e) {
        console.error(e);
      }
    }

    createTask();
  }, [timesSubmitted]);

  return (
    <>
      <ModalShell
        visible={props.visible}
        onOutOfBoundsClick={props.onOutOfBoundsClick}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.rootContainer}
        >
          <h3 className={styles.title}>Add New Task</h3>

          <div className={styles.metadataInputContainer}>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Take coffee break"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.metadataInputContainer}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              placeholder="e.g. Its always good to take a break. This 15 minute break will recharge the batteries a little."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.subtasksContainer}>
            <span className={styles.label}>Subtasks</span>
            <div>
              {subtasks.map((subtask, i) => {
                return (
                  <CreateSubtask
                    id={subtask.id}
                    key={i}
                    title={subtask.title}
                    placeholder={subtask.placeholder ? subtask.placeholder : ""}
                    onChange={handleSubtaskChange}
                    onRemoveSubtask={handleSubtaskRemoval}
                  />
                );
              })}
            </div>
          </div>

          <Button
            onClick={handleAddNewSubtask}
            label="+ Add New Subtask"
            color="white"
            textColor="#6760af"
          />

          <div className={styles.statusContainer}>
            <label className={styles.label} htmlFor="Status">
              Status
            </label>
            <select
              name="Status"
              id="Status"
              onChange={(e) => setStatus(e.target.value.toLowerCase())}
            >
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <Button onClick={createNewTask} label="Create Task" color="#645fc6" />
        </div>
      </ModalShell>
    </>
  );
}
