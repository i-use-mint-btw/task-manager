import { Subtask } from "../types"

export function debounce(delay: number, callback: () => void): () => void {
    let timer: number

    return () => {
        clearTimeout(timer)
        timer = setTimeout(callback, delay)
    }
}

export function completeAllSubtasks(subtasks: Subtask[]): Subtask[] {
    return subtasks.map(st => ({...st, completed: true}))
}