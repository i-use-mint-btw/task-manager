import styles from "./toggle-button.module.css"

interface IProps {
    bgColor: string
    enabled: boolean
    onClick: () => void
}

export default function ToggleButton(props: IProps) {
    return (
        <>
            <button className={styles.rootContainer} style={{backgroundColor: props.bgColor}} onClick={props.onClick}>
                <div className={props.enabled ? styles.enabled : styles.disabled}></div>
            </button>
        </>
    )
}