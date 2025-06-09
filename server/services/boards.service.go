package services

import (
	"database/sql"
	"fmt"

	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/models"
	"github.com/i-use-mint-btw/kanban-task-manager/storage"
)

func FindBoards(userID string) (*[]models.Board, error) {
	rows, err := storage.DB.Query("SELECT id, title FROM boards WHERE boards.user_id=$1", userID)
	if err != nil {
		return nil, err
	}

	var boards []models.Board

	for rows.Next() {
		var board models.Board
		rows.Scan(&board.ID, &board.Title)

		tasks, err := FindTasks(board.ID)

		if err == nil {
			board.Tasks = append(board.Tasks, *tasks...)
		}

		if err != nil && err != sql.ErrNoRows {
			fmt.Println("Could not read board", err)
			return nil, err
		}

		boards = append(boards, board)
	}

	return &boards, nil
}

func CreateBoard(title string, userID string) error {
	_, err := storage.DB.Exec("INSERT INTO boards (title, user_id) VALUES ($1, $2)", title, userID)
	return err
}

func UpdateBoard(dto *dtos.UpdateBoardDTO, boardID string) error {
	_, err := storage.DB.Exec("UPDATE boards SET title=$1 WHERE id=$2", dto.Title, boardID)
	return err
}


func DeleteBoard(boardID string) error {
	_, err := storage.DB.Exec("DELETE FROM boards WHERE id=$1", boardID)
	return err
}