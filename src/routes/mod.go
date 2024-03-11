package routes

import (
	"crypto/rand"
	"math/big"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type routeData struct {
	Path    string
	Handler func(*gin.Context)
}

func new(path string, handler func(*gin.Context)) *routeData {
	return &routeData{
		Path:    path,
		Handler: handler,
	}
}

func (r *routeData) build(app *gin.Engine, method string) {
	switch method {
	case "GET":
		app.GET(r.Path, r.Handler)
	case "POST":
		app.POST(r.Path, r.Handler)
	case "PUT":
		app.PUT(r.Path, r.Handler)
	case "PATCH":
		app.PATCH(r.Path, r.Handler)
	case "DELETE":
		app.DELETE(r.Path, r.Handler)
	case "OPTIONS":
		app.OPTIONS(r.Path, r.Handler)
	case "HEAD":
		app.HEAD(r.Path, r.Handler)
	case "ANY":
		app.Any(r.Path, r.Handler)
	}
}

func (r *routeData) buildV1(group *gin.RouterGroup, method string) {
	switch method {
	case "GET":
		group.GET(r.Path, r.Handler)
	case "POST":
		group.POST(r.Path, r.Handler)
	case "PUT":
		group.PUT(r.Path, r.Handler)
	case "PATCH":
		group.PATCH(r.Path, r.Handler)
	case "DELETE":
		group.DELETE(r.Path, r.Handler)
	case "OPTIONS":
		group.OPTIONS(r.Path, r.Handler)
	case "HEAD":
		group.HEAD(r.Path, r.Handler)
	case "ANY":
		group.Any(r.Path, r.Handler)
	}
}

func Load(app *gin.Engine) {
	new("/", index).build(app, http.MethodGet)
	new("/hc", func(ctx *gin.Context) {
		now := time.Now()
		ctx.JSON(200, gin.H{
			"ok":      1,
			"status":  200,
			"time":    now.Format(time.RFC3339),
			"unix_ms": now.UnixMilli(),
		})
	}).build(app, http.MethodGet)

	v1 := app.Group("/v1")
	{
		v1.GET("/hanriver", func(ctx *gin.Context) {
			r, _ := rand.Int(rand.Reader, big.NewInt(5))
			hanriver(ctx, int(r.Int64())+1)
		})
		v1.GET("/hanriver/:area", func(ctx *gin.Context) {
			area, err := strconv.ParseInt(ctx.Param("area"), 10, 64)
			if err != nil {
				ctx.JSON(400, gin.H{
					"ok":     0,
					"status": 400,
					"error":  "invalid area",
				})
				return
			}

			hanriver(ctx, int(area))
		})
	}
}
