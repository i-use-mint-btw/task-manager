import { useState } from "react"
import { Subtask as SubtaskModel } from "../../types"
import styles from "./subtask.module.css"

interface IProps {
    data: SubtaskModel
}

export default function Subtask(props: IProps) {
    const [checkboxSelected, setCheckboxSelected] = useState<boolean>(props.data.completed && props.data.completed)

    function handleCheckboxClick() {
        setCheckboxSelected(prev => !prev)
    }

    return (
        <>
            <div className={styles.rootContainer}>
                <input type="checkbox" className={styles.completionCheckbox} checked={checkboxSelected} onChange={handleCheckboxClick} />
                <p className={checkboxSelected ? styles.completedTitle : styles.title}>{props.data.title}</p>
            </div>
        </>
    )
}