export interface Board {
    id: number
    title: string
    tasks: Task[] | null
}

export interface Task {
    id: number
    boardID: number
    title: string
    description: string
    status: "todo" | "doing" | "done"
}