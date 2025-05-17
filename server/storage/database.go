package storage

import (
	"database/sql"

	"github.com/i-use-mint-btw/kanban-task-manager/config"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func SetupDB() error {
	var err error
	DB, err = sql.Open("postgres", config.Config.DBURL)

	if err != nil {
		return err
	}
	return nil
}

func CloseDB() {
	DB.Close()
}
