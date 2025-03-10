package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/services"
	"github.com/i-use-mint-btw/kanban-task-manager/utils"
)

func RegisterController(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		handlePostOnRegister(w, r)
	default:
		http.Error(w, "http method not allowed", http.StatusMethodNotAllowed)
	}

}

func handlePostOnRegister(w http.ResponseWriter, r *http.Request) {
	var dto dtos.RegisterUserDTO
	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to parse user data", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(&dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	// TODO: Fix this  section (for some reason this dosent fire when the user already exists and instead triggers an internal server error)
	_, err = services.FindUserByEmail(dto.Email)

	if err == nil {
		http.Error(w, "User already exists", http.StatusNotModified)
		return
	}

	err = services.CreateUser(&dto)

	if err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User created successfully"))
}
