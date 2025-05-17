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
		log.Fatalf("Error loading .env file")
	}

	Config = AppConfig{
		DBURL: getEnv("DB_URL", ""),
		ALLOWED_ORIGINS: getEnv("ALLOWED_ORIGINS", ""),
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