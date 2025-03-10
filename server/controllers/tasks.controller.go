package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/i-use-mint-btw/kanban-task-manager/constants"
	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/services"
	"github.com/i-use-mint-btw/kanban-task-manager/utils"
)

func TasksController(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		handlePostOnTasks(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

/* func handleGetOnTasks(w http.ResponseWriter, r *http.Request) *models.User {
	cookie, err := r.Cookie("session_id")

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return nil
	}

	user, err := services.FindUserBySessionID(cookie.Value)

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return nil
	}

	return user
} */

func handlePostOnTasks(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("boardID")

	if len(id) < constants.GENERIC_UUID_LENGTH {
		http.Error(w, "Invalid board id", http.StatusBadRequest)
		return
	}

	var dto dtos.CreateTaskDTO

	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to parse json", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	// Extra validation for task status
	if !utils.ValidateTaskStatus(dto.Status) {
		http.Error(w, "Invalid task status. status may only be 'todo', 'doing' or 'done'", http.StatusBadRequest)
		return
	}

	err = services.CreateTask(&dto, id)

	if err != nil {
		http.Error(w, "Failed to create task", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Task created successfully"))
}

func IDBasedTasksController(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPut:
		handlePutOnTasks(w, r)
	case http.MethodDelete:
		handleDeleteOnTasks(w,r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}


func handlePutOnTasks(w http.ResponseWriter, r * http.Request) {
	id := r.PathValue("taskID")

	if len(id) < constants.GENERIC_UUID_LENGTH {
		http.Error(w, "Invalid task id", http.StatusBadRequest)
		return
	}

	var dto dtos.UpdateTaskDTO

	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	if !utils.ValidateTaskStatus(dto.Status) {
		http.Error(w, "Invalid tasks status. status may only be todo, doing or done", http.StatusBadRequest)
		return
	}

	err = services.UpdateTask(&dto, id)

	if err != nil {
		http.Error(w, "Failed to update task", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Resource successfully updated"))
}

func handleDeleteOnTasks(w http.ResponseWriter, r * http.Request) {
	id := r.PathValue("taskID")

	if len(id) < constants.GENERIC_UUID_LENGTH {
		http.Error(w, "Invalid task id", http.StatusBadRequest)
		return
	}

	err := services.DeleteTask(id)

	if err != nil {
		http.Error(w, "Failed to delete task", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Resource successfully deleted"))
}