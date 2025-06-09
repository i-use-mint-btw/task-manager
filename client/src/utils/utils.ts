import { Subtask } from "../types"

export function completeAllSubtasks(subtasks: Subtask[]): Subtask[] {
    if (!subtasks) return subtasks
    return subtasks.map(st => ({...st, completed: true}))
}
