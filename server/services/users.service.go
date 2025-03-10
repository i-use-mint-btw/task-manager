package services

import (
	"github.com/i-use-mint-btw/kanban-task-manager/dtos"
	"github.com/i-use-mint-btw/kanban-task-manager/models"
	"github.com/i-use-mint-btw/kanban-task-manager/storage"
	"github.com/i-use-mint-btw/kanban-task-manager/utils"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(dto *dtos.RegisterUserDTO) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(dto.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	_, err = storage.DB.Exec("INSERT INTO users (email, password) VALUES ($1,$2);", dto.Email, hashedPassword)
	return err
}

func LoginUser(user *models.User) (string, error) {
	sessionToken, err := utils.GenerateToken(32)

	if err != nil {
		return "", err
	}

	_, err = storage.DB.Exec("UPDATE users SET session_id=$1 WHERE email=$2;", sessionToken, user.Email)

	if err != nil {
		return "", err
	}

	return sessionToken, nil
}

func FindUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := storage.DB.QueryRow("SELECT * FROM users WHERE users.email=$1;", email).Scan(&user.ID, &user.Email, &user.Password, &user.CreatedAt, &user.SessionID)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func FindUserBySessionID(sessionID string) (*models.User, error) {
	var user models.User
	err := storage.DB.QueryRow("SELECT id, email, password FROM users WHERE users.session_id=$1;", sessionID).Scan(&user.ID, &user.Email, &user.Password)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func FindUserByID(id string) (*models.User, error) {
	var user models.User
	err := storage.DB.QueryRow("SELECT * FROM users WHERE users.id=$1;", id).Scan(&user.ID, &user.Email, &user.Password, &user.SessionID, &user.CreatedAt)

	if err != nil {
		return nil, err
	}

	return &user, nil

}
