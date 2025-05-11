import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./create-board-button.module.css";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  onClick: () => void;
}

export default function CreateBoardButton(props: IProps) {
  return (
    <>
      <button className={styles.rootContainer} onClick={props.onClick}>
          <FontAwesomeIcon className={styles.boardIcon} icon={faBookOpen} />
          <p className={styles.boardTitle}>+Create New Board</p>
      </button>
    </>
  );
}
