import { useState } from "react";
import Modal from "../modal/Modal";
import styles from "./create-board-modal.module.css";
import { createBoard } from "../../api";
import useGlobalState from "../../context/GlobalContext";
import { Modals } from "../../constants";

export default function CreateBoardModal() {
  const [title, setTitle] = useState<string>("");
  const {activeModal, setActiveModal, forceRefetch} = useGlobalState()

  async function handleOutOfBoundsClick() {
    if (title.length < 1) return;

    try {
      const res = await createBoard(title)

      if (!res.ok) {
        throw new Error("Error when trying to create a new board");
      }

      setActiveModal(Modals.NONE)
      forceRefetch()
    } catch (e) {
      console.error(e)
    }

    setTitle("");
  }

  return (
    <>
      <Modal
        visible={activeModal === Modals.CREATE_BOARD}
        onOutOfBoundsClick={handleOutOfBoundsClick}
      >
        <div
          className={styles.rootContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <label htmlFor="title">Board title</label>
          <input
            name="title"
            type="text"
            placeholder="e.g. Home rennovations"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleOutOfBoundsClick()}
          />
        </div>
      </Modal>
    </>
  );
}
