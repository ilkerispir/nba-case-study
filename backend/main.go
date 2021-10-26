package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"os"
	"encoding/json"
)

type Teams struct {
    Teams []Team `json:"teams"`
}

type Team struct {
    TeamId int `json:"teamId"`
    Abbreviation string `json:"abbreviation"`
    TeamName string `json:"teamName"`
    SimpleName string `json:"simpleName"`
	Location string `json:"location"`
}

func main() {
	r := gin.Default()
	
	r.LoadHTMLGlob("templates/*.html")
	r.Static("/static", "./static")
	
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Ilker Ispir",
		})
	})

	r.POST("/teams", func(c *gin.Context) {
		teamFile, _ := os.Open("data/teams.json")

		defer teamFile.Close()

		teamByte, _ := ioutil.ReadAll(teamFile)

		var teams Teams

		json.Unmarshal(teamByte, &teams)

		c.JSON(http.StatusOK, teams.Teams)
	})

	r.POST("/players", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run(":8080")
}