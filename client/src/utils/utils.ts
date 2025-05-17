import { Subtask } from "../types"

export function completeAllSubtasks(subtasks: Subtask[]): Subtask[] {
    return subtasks.map(st => ({...st, completed: true}))
}
