import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./create-subtask.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  id: number
  placeholder: string;
  title: string
  onChange: (id: number, newValue: string) => void
  onRemoveSubtask: (id: number) => void
}

export default function CreateSubtask(props: IProps) {
  return (
    <>
      <div className={styles.rootContainer}>
        <input
          type="text"
          placeholder={props.placeholder && props.placeholder}
          onChange={e => props.onChange(props.id, e.target.value)}
        />
        <button className={styles.icon} onClick={() => props.onRemoveSubtask(props.id)}>
          <FontAwesomeIcon size="xl" icon={faX} />
        </button>
      </div>
    </>
  );
}
