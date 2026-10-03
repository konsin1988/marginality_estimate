package main


import (
  "net/http"
	"os"
	"fmt"
	"log"

  "konsin1988/margi/config"
	"konsin1988/margi/db/migrate"
  health "konsin1988/margi/db/health"
  transport "konsin1988/margi/http"
)

func main() {
	migrate.RunMigrations()

  db, err := config.ConnectDB()
  if err != nil{
    log.Fatal(err)
  }
  defer db.Close()

  //authRepo := keycloak.NewAuthRepository(kc)
  healthRepo := health.NewHealthRepository(db)
  //userRepo := user.NewUserRepo(db)
  //aiRepo := ai.NewAiRepo(db)
  //deptRepo := dept.NewDeptRepo(db)

  //// svc
  //authService := keycloak.NewService(authRepo)
  healthService := health.NewService(healthRepo) 
  //userService := user.NewService(userRepo) 
  //aiService := ai.NewService(aiRepo, redisCache, *chatQueue)
  //deptService := dept.NewService(deptRepo)
  //

  //validator := jwt.NewValidator(jwks, kc.Issuer, kc.ClientID)
  //jwtService := jwt.NewService(validator)
  //jwtMiddleware := jwt.Middleware(jwtService, userService)
  //


  //authHandler := transport.NewAuthHandler(authService)
  healthHandler := transport.NewHealthHandler(healthService)

	proxyPath := os.Getenv("PROXY_PATH")

  mux := http.NewServeMux()
  mux.Handle(fmt.Sprintf("%s/health", proxyPath), healthHandler)
  //mux.Handle(fmt.Sprintf("%s/playground", proxyPath), playground.Handler("GraphQL", "/graphql"))
  //mux.HandleFunc(fmt.Sprintf("%s/auth/login", proxyPath), authHandler.Login)
  //mux.HandleFunc(fmt.Sprintf("%s/auth/refresh", proxyPath), authHandler.Refresh)
  //mux.HandleFunc(fmt.Sprintf("%s/auth/logout", proxyPath), authHandler.Logout)
  //mux.HandleFunc(fmt.Sprintf("%s/auth/change_pass", proxyPath), authHandler.ChangePassword)
  //mux.Handle(fmt.Sprintf("%s/graphql", proxyPath), http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
  //  if r.Header.Get("Upgrade") == "websocket" || 
  //     r.Header.Get("Sec-WebSocket-Key") != "" {
  //      graphqlHandler.ServeHTTP(w, r)
  //      return
  //  }
  //  jwtMiddleware(graphqlHandler).ServeHTTP(w, r)
  //}))


  log.Println("Server started on :8000")
  log.Fatal(http.ListenAndServe(":8000", mux))

}
