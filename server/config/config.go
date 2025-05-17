package config

import (
	"github.com/joho/godotenv"
	"os"
	"log"
)

var Config AppConfig

type AppConfig struct {
	DBURL  			string
	ALLOWED_ORIGINS string
}

func SetupConfig() error {
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading local .env file, falling back to system environment variables")
	}

	Config = AppConfig{
		DBURL: os.Getenv("DB_URL"),
		ALLOWED_ORIGINS: os.Getenv("ALLOWED_ORIGINS"),
	}

	return nil
}