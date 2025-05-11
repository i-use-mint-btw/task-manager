import styles from "./button.module.css"

interface IProps {
  label: string;
  onClick: () => void;
  color?: string;
  textColor?: string;
}

export default function Button(props: IProps) {
  return (
    <>
      <button
        className={styles.button}
        style={{ backgroundColor: props.color ?? "blue", color: props.textColor ?? "white", paddingBlock: 15 }}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </>
  );
}
