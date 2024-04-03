package main

import (
	"flag"
	"fmt"
	"time"

	"github.com/devproje/plog/level"
	"github.com/devproje/plog/log"
	"github.com/devproje/project-api/src/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	debug bool
	port  int
)

func init() {
	flag.BoolVar(&debug, "debug", false, "enable debug mode")
	flag.IntVar(&port, "port", 3000, "port to run the server on")

	flag.Parse()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalln(err)
	}

	log.SetLevel(level.Debug)

	if !debug {
		log.SetLevel(level.Info)
		gin.SetMode(gin.ReleaseMode)
	}
}

func main() {
	log.Debugln(time.Now().Format(time.RFC3339))
	app := gin.Default()
	routes.Load(app)

	err := app.Run(fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalln(err)
	}
	println("Hello, World!")
}
