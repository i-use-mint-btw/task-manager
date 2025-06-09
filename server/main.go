package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/i-use-mint-btw/kanban-task-manager/config"
	"github.com/i-use-mint-btw/kanban-task-manager/controllers"
	"github.com/i-use-mint-btw/kanban-task-manager/middleware"
	"github.com/i-use-mint-btw/kanban-task-manager/storage"
	"github.com/i-use-mint-btw/kanban-task-manager/utils"
	"github.com/rs/cors"
)

func main() {
	err := config.SetupConfig()
	utils.Validate = validator.New(validator.WithRequiredStructEnabled())

	if err != nil {
		log.Fatalf("Failed to configure server. %s", err.Error())
	}

	err = storage.SetupDB()

	if err != nil {
		log.Fatalf("Failed to initialize database. %e", err)
	}
	defer func(){
		idk := recover()
		fmt.Println(idk)
		//storage.CloseDB()
	}()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{config.Config.ALLOWED_ORIGINS},
		AllowCredentials: true,
		AllowedMethods:   []string{"POST", "GET", "PUT", "DELETE", "OPTIONS"},
	})
	fmt.Println(config.Config.ALLOWED_ORIGINS, config.Config.DBURL)

	mux := http.NewServeMux() // Router
	wrappedMux := middleware.LogRequest(c.Handler(mux))

	mux.HandleFunc("/api/users/login", controllers.LoginController)
	mux.HandleFunc("/api/users/register", controllers.RegisterController)
	mux.HandleFunc("/api/boards", middleware.Authenticate(controllers.BoardsController))
	mux.HandleFunc("/api/boards/{boardID}", middleware.Authenticate(controllers.IDBasedBoardsController))
	mux.HandleFunc("/api/boards/{boardID}/tasks", middleware.Authenticate(controllers.TasksController))
	mux.HandleFunc("/api/boards/{boardID}/tasks/{taskID}", middleware.Authenticate(controllers.IDBasedTasksController))
	mux.HandleFunc("/api/boards/{boardID}/tasks/{taskID}/subtasks", middleware.Authenticate(controllers.SubtasksController))
	mux.HandleFunc("/api/boards/{boardID}/tasks/{taskID}/subtasks/{subtaskID}", middleware.Authenticate(controllers.IDBasedSubtasksController))
	mux.HandleFunc("/*", func(w http.ResponseWriter, r *http.Request) { http.Error(w, "Invalid route", http.StatusNotFound) })

	fmt.Println("Server is up and running")
	http.ListenAndServe(":2680", wrappedMux)
}

/*

    POST /api/users/register: Create a new user account. **DONE**
    POST /api/users/login: Authenticate a user and return a token. **DONE**

Board Endpoints

    GET /api/boards: Retrieve all boards for the authenticated user. **DONE**
    GET /api/boards/{boardId}: Retrieve a specific board by ID.
    POST /api/boards: Create a new board. **DONE**
    PUT /api/boards/{boardId}: Update a specific board. **DONE**
    DELETE /api/boards/{boardId}: Delete a specific board. **DONE**

Task Endpoints

    GET /api/boards/{boardId}/tasks: Retrieve all tasks for a specific board.
    POST /api/boards/{boardId}/tasks: Create a new task in a specific board.  **DONE**
    GET /api/boards/{boardId}/tasks/{taskId}: Retrieve a specific task by ID.
    PUT /api/boards/{boardId}/tasks/{taskId}: Update a specific task. **DONE**
    DELETE /api/boards/{boardId}/tasks/{taskId}: Delete a specific task. **DONE**

Subtask Endpoints
    GET /api/boards/{boardId}/tasks/{taskId}/subtasks: Retrieve all subtasks for a specific task.
    POST /api/boards/{boardId}/tasks/{taskId}/subtasks: Create a new subtask for a specific task. //
    GET /api/boards/{boardId}/tasks/{taskId}/subtasks/{subtaskId}: Retrieve a specific subtask by ID.
    PUT /api/boards/{boardId}/tasks/{taskId}/subtasks/{subtaskId}: Update a specific subtask. //
    DELETE /api/boards/{boardId}/tasks/{taskId}/subtasks/{subtaskId}: Delete a specific subtask.
*/
