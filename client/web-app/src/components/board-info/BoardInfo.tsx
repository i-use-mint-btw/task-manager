import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./board-info.module.css";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Board } from "../../types";
import useGlobalState from "../../context/GlobalContext";

interface IProps {
  data: Board
  selected: boolean
}

export default function BoardInfo(props: IProps) {
  const {setSelectedBoard} = useGlobalState()

  return (
    <>
      <button className={styles.rootContainer} onClick={() => setSelectedBoard(props.data)}>
        <div className={props.selected ? styles.boardInfoContainerSelected : styles.boardInfoContainerDeselected}>
          <FontAwesomeIcon className={props.selected ? styles.boardIconSelected : styles.boardIconDeselected} icon={faBookOpen} />
          <p className={props.selected ? styles.boardTitleSelected : styles.boardTitleDeselected}>{props.data.title}</p>
        </div>
      </button>
    </>
  );
}
