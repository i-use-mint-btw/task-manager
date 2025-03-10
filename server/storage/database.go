package storage

import (
	"database/sql"
	"fmt"

	"github.com/i-use-mint-btw/kanban-task-manager/config"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func SetupDB() error {
	connStr := fmt.Sprintf("user=%s dbname=%s password=%s", config.Config.DBUSER, config.Config.DBNAME, config.Config.DBPASS)
	var err error
	DB, err = sql.Open("postgres", connStr)

	if err != nil {
		return err
	}
	return nil
}

func CloseDB() {
	DB.Close()
}