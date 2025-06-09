import { API_URL } from "./constants";
import { CreateTask, Task, TaskStatus } from "./types";
import { completeAllSubtasks } from "./utils/utils";

export async function createTask(boardID: string, task: CreateTask) {
  
  return fetch(API_URL + "/boards/" + boardID + "/tasks", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      status: task.status,
      subtasks: task.subtasks.filter(subtask => subtask.title !== ""),
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function updateTaskByID(boardID: string, task: Task) {
  const status: TaskStatus = task.status.toLocaleLowerCase() as TaskStatus;

  return fetch(API_URL + "/boards/" + boardID + "/tasks/" + task.id, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      title: task.title,
      description: task.description ?? "No description",
      status: status,
      subtasks:
        status === "done" ? completeAllSubtasks(task.subtasks) : task.subtasks,
    }),
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export async function createBoard(title: string) {
  return fetch(API_URL + "/boards", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json"
    },
  });
}
