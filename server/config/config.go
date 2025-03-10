package config

import (
	"github.com/joho/godotenv"
	"os"
	"log"
)

var Config AppConfig

type AppConfig struct {
	DBNAME string 
	DBUSER string
	DBPASS string
}

func SetupConfig() error {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	Config = AppConfig{
		DBNAME: getEnv("DB_NAME", ""),	
		DBUSER: getEnv("DB_USER", ""),
        DBPASS: getEnv("DB_PASS", ""),
	}

	return nil
}

func getEnv(key, fallback string) string {
    value := os.Getenv(key)
    if value == "" {
        return fallback
    }
    return value
}