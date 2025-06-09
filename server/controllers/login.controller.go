package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/services"
	"github.com/i-use-mint-btw/kanban-task-manager/utils"
	"golang.org/x/crypto/bcrypt"
)

func LoginController(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		handlePostOnLogin(w, r)
	default:
		http.Error(w, "http method not allowed", http.StatusMethodNotAllowed)
	}
}

func handlePostOnLogin(w http.ResponseWriter, r *http.Request) {
	var dto dtos.LoginUserDTO

	err := json.NewDecoder(r.Body).Decode(&dto)

	if err != nil {
		http.Error(w, "Failed to decode json", http.StatusBadRequest)
		return
	}

	if ok, errors := utils.ValidateInputs(&dto); !ok {
		utils.ValidationError(w, errors, http.StatusUnprocessableEntity)
		return
	}

	user, err := services.FindUserByEmail(dto.Email)

	if err != nil {
		http.Error(w, "User does not exist", http.StatusNotFound)
		return
	}
	
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(dto.Password))

	if err != nil {
		http.Error(w, "Incorrect username or password", http.StatusNotFound)
		return
	}

	if user.SessionID != nil {
		http.SetCookie(w, &http.Cookie{
			Name:     "session_id",
			Value:    *user.SessionID,
			HttpOnly: true,                 // Prevents access by frontend javascript
			Path:     "/",                  // specifies the path that must exist in the URL for a cookie to be sent (e.g. path="/api/users" means the cookie could only be sent to that route)
			SameSite: http.SameSiteLaxMode, // says that the cookie cannot be accessed by third party domains
			Secure:   false,                // only sent over https
			// Domain: "*", // specifies which server can receive a cookie (this domain by default and does not include subdomains)
		})
		w.Write([]byte("User logged in successfully"))
		return
	}

	sessionID, err := services.LoginUser(user)

	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, "Incorrect username or password", http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		HttpOnly: true,                 // Prevents access by frontend javascript
		Path:     "/",                  // specifies the path that must exist in the URL for a cookie to be sent (e.g. path="/api/users" means the cookie could only be sent to that route)
		SameSite: http.SameSiteLaxMode, // says that the cookie cannot be accessed by third party domains
		Secure:   false,                // only sent over https
		// Domain: "*", // specifies which server can receive a cookie (this domain by default and does not include subdomains)
	})
	w.Write([]byte("User logged in successfully"))
}
