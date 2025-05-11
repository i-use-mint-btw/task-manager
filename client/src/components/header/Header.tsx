import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../button/Button";
import styles from "./header.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import useGlobalState from "../../context/GlobalContext";
import { Modals } from "../../constants";

export default function Header() {
  const { toggleSidebar } = useGlobalState();
  const { selectedBoard, setActiveModal } = useGlobalState();

  function handleNewTaskClick() {
    if (!selectedBoard) {
      alert("Please select a board first.");
      return;
    }

    setActiveModal(Modals.CREATE_TASK)
  }

  return (
    <>
      <header className={styles.rootContainer}>
        <h1 className={styles.headerTitle}>{selectedBoard?.title ?? "No board selected"}</h1>
        <div className={styles.buttonsContainer}>
          <Button
            label="+Add New Task"
            color="#645fc6"
            onClick={handleNewTaskClick}
          />
          <button className={styles.optionsButton} onClick={toggleSidebar}>
            <FontAwesomeIcon
              className={styles.elipsisIcon}
              icon={faEllipsisVertical}
            />
          </button>
        </div>
      </header>
    </>
  );
}
