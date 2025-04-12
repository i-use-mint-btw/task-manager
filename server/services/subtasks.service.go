package services

import (
	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/models"
	"github.com/i-use-mint-btw/kanban-task-manager/storage"

	"fmt"
)

func FindSubtasks(taskID string) (*[]models.Subtask, error) {
	rows, err := storage.DB.Query("SELECT id, task_id, title, completed FROM subtasks WHERE task_id=$1", taskID)

	if err != nil {
		return nil, err
	}

	var subtasks []models.Subtask

	for rows.Next() {
		var subtask models.Subtask
		rows.Scan(&subtask.ID, &subtask.TaskID, &subtask.Title, &subtask.Completed)
		subtasks = append(subtasks, subtask)
	}


	return &subtasks, nil
}

func CreateSubtask(dto *dtos.CreateSubtaskDTO, taskID string) error {
	_, err := storage.DB.Exec("INSERT INTO subtasks (title, task_id) VALUES ($1,$2)", dto.Title, taskID)
	return err
}

func CreateSubtasks(dto *[]dtos.CreateSubtaskDTO, taskID string) error {
	if len(*dto) < 1 || dto == nil {
		return nil
	}

	query := "INSERT INTO subtasks (title, task_id, completed) VALUES"

	for _, subtask := range *dto {
		fragment := fmt.Sprintf(" ('%v', '%v', %v),", subtask.Title, taskID, subtask.Completed)
		query += fragment
	}

	query = query[:len(query) - 1]
	query += ";"

	_, err := storage.DB.Exec(query)
	
	if err != nil {
		fmt.Println(query)
		fmt.Println(err)
	}

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

func UpdateSubtasks(dto *[]dtos.UpdateSubtaskDTO) error {
	if len(*dto) < 1 || dto == nil {
		return nil
	}

	query := "UPDATE subtasks SET title = CASE"

	for _, subtask := range *dto {
		fragment := fmt.Sprintf(" WHEN id='%v' THEN '%v'", subtask.ID, subtask.Title)
		query += fragment
	}

	query += " ELSE title END, completed = CASE"

	for _, subtask := range *dto {
		fragment := fmt.Sprintf(" WHEN id='%v' THEN %v", subtask.ID, subtask.Completed)
		query += fragment
	}

	query += " ELSE completed END WHERE id IN ("

	for _, subtask := range *dto {
		fragment := fmt.Sprintf("'%v',", subtask.ID)
		query += fragment
	}

	query = query[:len(query) - 1]
	query += ");"

	_, err := storage.DB.Exec(query)
	
	if err != nil {
		fmt.Println(query)
		fmt.Println(err)
	}

	return err
}