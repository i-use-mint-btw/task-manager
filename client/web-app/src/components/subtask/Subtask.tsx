import { useState } from "react"
import { Subtask as SubtaskModel} from "../../types"
import styles from "./subtask.module.css"
import useGlobalState from "../../context/GlobalContext"

interface IProps {
    data: SubtaskModel
}

export default function Subtask(props: IProps) {
    const [checkboxSelected, setCheckboxSelected] = useState<boolean>(props.data.completed)
    const {selectedTask, setSelectedTask} = useGlobalState()

    function handleCheckboxClick() {
        setCheckboxSelected(prev => !prev)

        if (!selectedTask?.subtasks) return

        const updatedSubtasks = selectedTask.subtasks.map(subtask => {
            if (subtask === props.data) {
                return {...subtask, completed: !subtask.completed} as SubtaskModel
            }
            return subtask
        })

        setSelectedTask({...selectedTask, subtasks: updatedSubtasks})
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