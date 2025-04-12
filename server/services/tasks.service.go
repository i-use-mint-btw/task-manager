package services

import (
	"database/sql"
	"fmt"

	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/models"
	"github.com/i-use-mint-btw/kanban-task-manager/storage"
)

func FindTasks(boardID string) (*[]models.Task, error) {
	rows, err := storage.DB.Query("SELECT id, board_id, title, description, status FROM tasks WHERE tasks.board_id=$1", boardID)

	if err != nil {
		return nil, err
	}

	var tasks []models.Task

	for rows.Next() {
		var task models.Task
		err = rows.Scan(&task.ID, &task.BoardID, &task.Title, &task.Description, &task.Status)

		if err != nil {
			return nil, err
		}

		subtasks, err := FindSubtasks(task.ID)

		if err != nil && err != sql.ErrNoRows {
			return nil, err
		}

		task.Subtasks = *subtasks
		tasks = append(tasks, task)
	}

	return &tasks, nil
}

func CreateTask(dto *dtos.CreateTaskDTO, boardID string) error {
	row := storage.DB.QueryRow("INSERT INTO tasks (board_id, title, description, status) VALUES ($1,$2,$3,$4) RETURNING id", boardID, dto.Title, dto.Description, dto.Status)

	var taskID string
	err := row.Scan(&taskID)

	if err != nil {
		return err
	}

	err = CreateSubtasks(&dto.Subtasks, taskID)	

	if err != nil {
		return err
	}

	return nil
}

func UpdateTask(dto *dtos.UpdateTaskDTO, taskID string) error {
	err := UpdateSubtasks(&dto.Subtasks)

	if err != nil {
		fmt.Println(err)
		return err
	}

	_, err = storage.DB.Exec("UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4", dto.Title, dto.Description, dto.Status, taskID)
	return err
}

func DeleteTask(taskID string) error {
	_, err := storage.DB.Exec("DELETE FROM tasks WHERE id=$1", taskID)
	return err
}