import { useState } from "react";
import Modal from "../modal/Modal";
import styles from "./create-board-modal.module.css";
import { API_URL } from "../../constants";

interface IProps {
  visible: boolean;
  onOutOfBoundsClick: () => void;
  onResourceAdded: () => void;
}

export default function CreateBoardModal(props: IProps) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<unknown | null>();

  async function handleOutOfBoundsClick() {
    if (title.length < 1) {
      props.onOutOfBoundsClick();
      return;
    }

    setError(null);
    try {
      const res = await fetch(API_URL + "/boards", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          title: title,
        }),
      });

      if (!res.ok) {
        throw new Error("Error when trying to create a new board");
      }

      props.onResourceAdded();
    } catch (err) {
      setError(err);
    }

    props.onOutOfBoundsClick();
    setTitle("");
  }

  return (
    <>
      <Modal
        visible={props.visible}
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
