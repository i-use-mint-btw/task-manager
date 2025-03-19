import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../button/Button";
import styles from "./header.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  boardName: string;
  toggle: () => void
}

export default function Header(props: IProps) {
  function handleAddNewTask() {}

  return (
    <>
      <header className={styles.rootContainer}>
        <h1 className={styles.headerTitle}>{props.boardName}</h1>
        <div className={styles.buttonsContainer}>
          <Button
            label="+Add New Task"
            color="#645fc6"
            onClick={handleAddNewTask}
          />
          <button className={styles.optionsButton} onClick={props.toggle}>
            <FontAwesomeIcon className={styles.elipsisIcon} icon={faEllipsisVertical} />
          </button>
        </div>
      </header>
    </>
  );
}
