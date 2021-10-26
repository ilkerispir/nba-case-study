package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"os"
	"encoding/json"
	"fmt"
)

type Teams struct {
    Teams []Team `json:"teams"`
}

type Team struct {
    teamId int `json:"teamId"`
    abbreviation string `json:"abbreviation"`
    teamName string `json:"teamName"`
    simpleName string `json:"simpleName"`
	location string `json:"location"`
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
		jsonFile, _ := os.Open("data/teams.json")
		byteValue, _ := ioutil.ReadAll(jsonFile)

		var teams Teams
		json.Unmarshal(byteValue, &teams)

		fmt.Println(teams.Teams[0].teamName)
		c.JSON(http.StatusOK, teams.Teams)
	})

	r.POST("/players", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run(":8080")
}