package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/i-use-mint-btw/kanban-task-manager/constants"
	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/services"
	"github.com/i-use-mint-btw/kanban-task-manager/utils"
)

func BoardsController(w http.ResponseWriter, r * http.Request) {
	switch r.Method {
	case http.MethodGet:
		handleGetOnBoards(w, r)
	case http.MethodPost:
		handlePostOnBoards(w, r)
	default:
		http.Error(w, "http method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleGetOnBoards(w http.ResponseWriter, r * http.Request) {
	cookie, err := r.Cookie("session_id")

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	user, err := services.FindUserBySessionID(cookie.Value)

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	boards, err := services.FindBoards(user.ID)

	if err != nil {
		http.Error(w, "Could not find any boards for the given user", http.StatusNotFound)
		return
	}

	boardsAsJSON, err := json.Marshal(*boards)

	if err != nil {
		http.Error(w, "Failed to return boards", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(boardsAsJSON)
}

func handlePostOnBoards(w http.ResponseWriter, r * http.Request) {
	cookie, err := r.Cookie("session_id")

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	user, err := services.FindUserBySessionID(cookie.Value)

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var dto dtos.CreateBoardDTO

	err = json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to decode json", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(&dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	err = services.CreateBoard(dto.Title, user.ID)

	if err != nil {
		http.Error(w, "Failed to create a new board", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Board created successfully"))
}


func IDBasedBoardsController(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPut:
		handlePutOnBoards(w, r)
	case http.MethodDelete:
		handleDeleteOnBoards(w,r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}


func handlePutOnBoards(w http.ResponseWriter, r * http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	id := r.PathValue("boardID")

	if len(id) < constants.GENERIC_UUID_LENGTH {
		http.Error(w, "Invalid board id", http.StatusBadRequest)
		return
	}

	var dto dtos.UpdateBoardDTO

	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	err = services.UpdateBoard(&dto, id)

	if err != nil {
		http.Error(w, "Failed to update board", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Resource successfully updated"))
}

func handleDeleteOnBoards(w http.ResponseWriter, r * http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	id := r.PathValue("boardID")

	if len(id) < constants.GENERIC_UUID_LENGTH {
		http.Error(w, "Invalid board id", http.StatusBadRequest)
		return
	}

	err := services.DeleteBoard(id)

	if err != nil {
		http.Error(w, "Failed to delete board", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Resource successfully deleted"))
}