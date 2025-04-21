import { MouseEvent, ReactNode, useState } from "react";
import styles from "./modal.module.css";

interface IProps {
  onOutOfBoundsClick: () => void;
  children?: ReactNode;
}

export default function Modal(props: IProps) {
  const [isVisible, setIsVisible] = useState(false);

  function handleOutOfBoundsClick(e: MouseEvent) {
    e.stopPropagation();
    props.onOutOfBoundsClick();
    setIsVisible((prev) => !prev);
  }

  return (
    isVisible && (
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
