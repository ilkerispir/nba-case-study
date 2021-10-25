package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	
	r.LoadHTMLGlob("templates/*.html")
	r.Static("/static", "./static")
	
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Ilker Ispir",
		})
	})

	r.Run(":8080")
}