package middleware

import (
	"log"
	"net/http"

	"github.com/i-use-mint-btw/kanban-task-manager/config"
	"github.com/i-use-mint-btw/kanban-task-manager/services"
)

func Authenticate(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session_id")

		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		_, err = services.FindUserBySessionID(cookie.Value)

		if err != nil {
			http.Error(w, "User not found in the database", http.StatusNotFound)
			return
		}
		next.ServeHTTP(w, r)
	}
}

func LogRequest(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *( http.Request)) {
		log.Printf("A %s request has been made to %s by %s", r.Method, r.URL, r.RemoteAddr)
		next.ServeHTTP(w, r)
	}
}

func Cors(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", config.Config.ALLOWED_ORIGINS)
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		// Preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent) // 204 No Content
			return
	}

		next.ServeHTTP(w, r)
	}
}