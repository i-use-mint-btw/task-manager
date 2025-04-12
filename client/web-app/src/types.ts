export interface Board {
    id: string
    title: string
    tasks: Task[] | null
}

export interface Task {
    id: string
    boardID: string
    title: string
    description: string
    status: TaskStatus
    subtasks: Subtask[]
}

export interface Subtask {
    title: string
    completed: boolean
    id?: string
    taskID?: string
}

export interface CreateSubtask {
    id: number
    title: string
    completed: boolean
    placeholder?: string
}

export type TaskStatus = "todo" | "doing" | "done"