package routes

import "github.com/gin-gonic/gin"

const github = "https://github.com/devproje/project-api"

func index(ctx *gin.Context) {
	ctx.Redirect(301, github)
}
