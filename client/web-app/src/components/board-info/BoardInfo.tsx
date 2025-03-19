import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./board-info.module.css";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  id: number;
  title: string;
  selected: boolean;
  onClick: (id: number) => undefined;
}

export default function BoardInfo(props: IProps) {
  return (
    <>
      <button className={styles.rootContainer} onClick={() => props.onClick(props.id)}>
        <div className={props.selected ? styles.boardInfoContainerSelected : styles.boardInfoContainerDeselected}>
          <FontAwesomeIcon className={props.selected ? styles.boardIconSelected : styles.boardIconDeselected} icon={faBookOpen} />
          <p className={props.selected ? styles.boardTitleSelected : styles.boardTitleDeselected}>{props.title}</p>
        </div>
      </button>
    </>
  );
}
