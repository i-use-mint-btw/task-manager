package utils

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

var Validate *validator.Validate

func ValidateInputs(dataSet interface{}) (bool, map[string]string) {
	err := Validate.Struct(dataSet)

	// Validation syntax is invalid
	if err != nil {
		if err, ok := err.(*validator.InvalidValidationError); ok {
			panic(err)
		}

		// Validation errors occurred
		errors := make(map[string]string)
		reflected := reflect.ValueOf(dataSet)

		for _, err := range err.(validator.ValidationErrors) {
			// Attempt to find field by name and get json tag name
			field, _ := reflected.Type().FieldByName(err.StructField())
			var name string

			// If name dosent exist use lowercase of name
			if name = field.Tag.Get("json"); name == "" {
				name = strings.ToLower(err.StructField())
			}

			switch err.Tag() {
			case "required": 
				errors[name] = "Field " + name + " is required"
				break
			case "email":
				errors[name] = "Field " + name + " should be a valid email"
				break
			case "eqfield":
				errors[name] = "Field " + name + " should be equal to the " + err.Param()
				break
			case "alphanum":
				errors[name] = "Field " + name + " should be alphanumeric"
				break
			default:
				errors[name] = "Field " + name + " is invaliid"
				break
			}
		}
		return false, errors
	}
	return true, nil
}

func ValidationError(w http.ResponseWriter, errors map[string]string, status int) {
	for key := range errors {
		http.Error(w, errors[key], status)
		break
	}
}

func GenerateToken(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err // ideally should return custom token generation error (e.g. ErrTokenGeneration)
	}
	return base64.URLEncoding.EncodeToString(bytes), nil
}

func ValidateTaskStatus(status string) bool {
	switch status {
	case "todo":
		return true
	case "doing": 
		return true
	case "done":
		return true
	default:
		return false
	}
}