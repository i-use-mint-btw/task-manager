package services

import (
	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/models"
	"github.com/i-use-mint-btw/kanban-task-manager/storage"
)

func FindSubtasks(taskID string) (*[]models.Subtask, error) {
	rows, err := storage.DB.Query("SELECT * FROM subtasks WHERE task_id=$1", taskID)

	if err != nil {
		return nil, err
	}

	var subtasks []models.Subtask

	for rows.Next() {
		var subtask models.Subtask
		rows.Scan(&subtask.ID, &subtask.TaskID, &subtask.Title, &subtask.CreatedAt)
		subtasks = append(subtasks, subtask)
	}


	return &subtasks, nil
}

func CreateSubtask(dto *dtos.CreateSubtaskDTO, taskID string) error {
	_, err := storage.DB.Exec("INSERT INTO subtasks (title, task_id) VALUES ($1,$2)", dto.Title, taskID)
	return err
}

func DeleteSubtask(subtaskID string) error {
	_, err := storage.DB.Exec("DELETE FROM subtasks WHERE id=$1", subtaskID)
	return err
}

func UpdateSubtask(dto *dtos.UpdateSubtaskDTO, subtaskID string) error {
	_, err := storage.DB.Exec("UPDATE subtasks SET title=$1 WHERE id=$2", dto.Title, subtaskID)
	return err
}