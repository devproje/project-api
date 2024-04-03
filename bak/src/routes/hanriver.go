package routes

import (
	"fmt"
	"time"

	"github.com/devproje/project-api/src/api"
	"github.com/gin-gonic/gin"
)

func hanriver(ctx *gin.Context, area int) {
	started := time.Now()
	data, err := api.GetHanRiver(area)
	if err != nil {
		ctx.JSON(500, gin.H{
			"ok":     0,
			"status": 500,
			"error":  err.Error(),
		})
		return
	}

	latency := time.Since(started).Milliseconds()
	ctx.JSON(200, gin.H{
		"ok":     1,
		"status": 200,
		"data": gin.H{
			"area": data.Area,
			"date": data.DateTime.Format(time.RFC3339),
			"temp": data.Temp,
			"ph":   data.PH,
		},
		"res_time": fmt.Sprintf("%dms", latency),
	})
}
