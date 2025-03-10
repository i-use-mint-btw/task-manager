package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/i-use-mint-btw/kanban-task-manager/constants"
	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/services"
	"github.com/i-use-mint-btw/kanban-task-manager/utils"
)

func SubtasksController(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		handlePostOnSubtasks(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
} 

func handlePostOnSubtasks(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("taskID")

	var dto dtos.CreateSubtaskDTO

	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to parse json", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	err = services.CreateSubtask(&dto, id)

	if err != nil {
		http.Error(w, "Failed to create subtask", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Subtask created successfully"))
}


func IDBasedSubtasksController(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPut:
		handlePutOnSubtasks(w, r)
	case http.MethodDelete:
		handleDeleteOnSubtasks(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handlePutOnSubtasks(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("subtaskID")

	if len(id) < constants.GENERIC_UUID_LENGTH {
		http.Error(w, "Invalid subtask id", http.StatusBadRequest)
		return
	}

	var dto dtos.UpdateSubtaskDTO

	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	err = services.UpdateSubtask(&dto, id)

	if err != nil {
		http.Error(w, "Failed to update subtask", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Resource successfully updated"))
}


func handleDeleteOnSubtasks(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("subtaskID")

	if len(id) < constants.GENERIC_UUID_LENGTH {
		http.Error(w, "Invalid subtask id", http.StatusBadRequest)
		return
	}

	err := services.DeleteSubtask(id)

	if err != nil {
		http.Error(w, "Failed to delete subtask", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Resource successfully deleted"))
}