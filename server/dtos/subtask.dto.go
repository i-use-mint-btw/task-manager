package dtos

type CreateSubtaskDTO struct {
	Title string `json:"title" validate:"max=255,required"`
	Completed bool `json:"completed" validate:"required"`
}

type UpdateSubtaskDTO struct {
	ID string `json:"id" validate:"max=255,required"`
	Title string `json:"title" validate:"max=255,required"`
	Completed bool `json:"completed" validate:"required"`
}