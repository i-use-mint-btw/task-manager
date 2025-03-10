package dtos

type RegisterUserDTO struct {
	Email    string `json:"email" validate:"required,email"`
	Password string	`json:"password" validate:"required,min=8,max=40"`
}

type LoginUserDTO struct {
	Email    string `json:"email"`
	Password string	`json:"password"`
}

type UpdateUserDTO struct {
	Email    *string `json:"email"`
	Password *string `json:"password"`
}

