const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
 
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey= "";
    const units = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid="+apiKey+"&units="+units;
    https.get(url, function (response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const imgUrl = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            console.log(temp, description);
            res.write("<h1>The temperature in " +query+ "   is "+temp+" degree celcium</h1>");
            res.write("<p>The weather description is "+description+"</p>");
            res.write("<img src="+imgUrl+">" );
            res.send();
        });
});
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});

