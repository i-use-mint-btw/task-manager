import { MouseEvent, ReactNode } from "react";
import styles from "./modal.module.css";
import useGlobalState from "../../context/GlobalContext";
import { Modals } from "../../constants";

interface IProps {
  visible: boolean
  onOutOfBoundsClick: () => void;
  children?: ReactNode;
}

export default function Modal(props: IProps) {
  const {setActiveModal} = useGlobalState()

  function handleOutOfBoundsClick(e: MouseEvent) {
    setActiveModal(Modals.NONE)
    e.stopPropagation();
    props.onOutOfBoundsClick();
  }

  return (
      props.visible && (
      <>
        <div
          className={styles.rootContainer}
          onClick={(e) => handleOutOfBoundsClick(e)}
        >
          <div className={styles.mainContainer}>{props.children}</div>
        </div>
      </>
    )
  );
}
