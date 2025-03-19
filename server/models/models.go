package models

import (
	"time"
)


type User struct {
	ID           string
	Email        string
	Password 	 string
	CreatedAt    time.Time
	SessionID 	 *string
	// Boards       []Board
}

type Board struct {
	ID        string  	`json:"id"`
	//UserID    string	`json:"userID"`
	Title     string	`json:"title"`
	Tasks     []Task	`json:"tasks"`
	//CreatedAt time.Time	`json:"createdAt"`
	// User      User
}

type Task struct {
	ID          string		`json:"id"`
	BoardID     string		`json:"boardID"`
	Title       string		`json:"title"`
	Description string		`json:"description"`
	Status 		string		`json:"status"`
	Subtasks    []Subtask	`json:"subtasks"`
	CreatedAt   time.Time 	`json:"createdAt"`
	// Board       Board
}

type Subtask struct {
	ID          string		`json:"id"`
	TaskID      string		`json:"taskID"`
	Title       string		`json:"title"`
	CreatedAt   time.Time	`json:"createdAt"`
	// Task        Task
}