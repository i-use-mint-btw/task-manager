package dtos

type CreateBoardDTO struct {
	Title string `json:"title"`
}

type UpdateBoardDTO struct {
	Title string `json:"title" validate:"required"`
}