package routes

import (
	"crypto/rand"
	"math/big"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func Load(app *gin.Engine) {
	app.GET("/", index)
	app.GET("/hc", func(ctx *gin.Context) {
		now := time.Now()
		ctx.JSON(200, gin.H{
			"ok":      1,
			"status":  200,
			"time":    now.Format(time.RFC3339),
			"unix_ms": now.UnixMilli(),
		})
	})

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
