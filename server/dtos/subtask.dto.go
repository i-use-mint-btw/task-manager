package dtos

type CreateSubtaskDTO struct {
	Title string `json:"title" validate:"max=255,required"`
}

type UpdateSubtaskDTO struct {
	Title string `json:"title" validate:"max=255,required"`
}