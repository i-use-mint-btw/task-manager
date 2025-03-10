package dtos

type CreateTaskDTO struct {
	Title    	string 	`json:"title" validate:"max=255,required"`
	Description string	`json:"description" validate:"max=65535"`
	Status 		string	`json:"status" validate:"max=5,required"`
	Subtasks 	[]CreateSubtaskDTO
}

type UpdateTaskDTO struct {
	Title    	string 	`json:"title" validate:"max=255,required"`
	Description string	`json:"description" validate:"max=65535,required"`
	Status 		string	`json:"status" validate:"max=5,required"`
	Subtasks 	[]UpdateSubtaskDTO
}