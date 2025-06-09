import { useState } from "react";
import Button from "../button/Button";
import CreateSubtask from "../create-subtask/CreateSubtask";
import Modal from "../modal/Modal";
import styles from "./create-task-modal.module.css";
import { CreateSubtask as CreateSubtaskModel, CreateTask } from "../../types";
import useGlobalState from "../../context/GlobalContext";
import { createTask } from "../../api";
import { Modals } from "../../constants";

export default function CreateTaskModal() {
  const { selectedBoard, activeModal, setActiveModal, forceRefetch } = useGlobalState();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("No description provided");
  const [status, setStatus] = useState<string>("todo");
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

  function handleAddNewSubtask() {
    setSubtasks((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: 1,
            completed: false,
            title: "",
            placeholder: "e.g. Add some sugar",
          },
        ];
      }

      return [
        ...prev,
        {
          id: prev[prev.length - 1].id + 1,
          completed: false,
          title: "",
          placeholder: "e.g. Add some sugar",
        },
      ];
    });
  }

  function handleSubtaskChange(id: number, newValue: string) {
    setSubtasks((prev) => {
      prev[id - 1].title = newValue;
      return prev;
    });
  }

  function handleSubtaskRemoval(id: number) {
    setSubtasks((prevSubtasks) => {
      return prevSubtasks.filter((prevSubtask) => prevSubtask.id !== id);
    });
  }

  async function handleCreateTaskClick() {
    if (!selectedBoard) return;

    try {
      const res = await createTask(selectedBoard.id, {
        title,
        description,
        status,
        subtasks,
      } as CreateTask);

      if (!res.ok) {
        throw new Error("Error when making request");
      }
      
      setActiveModal(Modals.NONE)
      forceRefetch()
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Modal visible={activeModal === Modals.CREATE_TASK} onOutOfBoundsClick={() => {}}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.rootContainer}
        >
          <h3 className={styles.title}>Add New Task</h3>

          <div className={styles.metadataInputContainer}>
            <label className={styles.label} htmlFor="title">
              Title *
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
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          <Button onClick={handleCreateTaskClick} label="Create Task" color="#645fc6" />
        </div>
      </Modal>
    </>
  );
}
