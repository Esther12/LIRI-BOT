require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api'); 
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var fileName = '';
var userInput = [];
for(let i = 2; i < process.argv.length; i++){
    userInput.push(process.argv[i]);
}
console.log(userInput);

// spotify search the song name

// spotify.search({
//     type: 'track',
//     query: "Bad boy"
// }, function(err, data){
//     if(err){
//         console.log(err);
//     }
//     console.log(data);
// })

if(userInput[0] === "movie-this"){
    var movieName = [];
    if(userInput.toString() === userInput[0].toString() ){
        movieName = ["Mr. Nobody."];
    }else{
        movieName = userInput;
        movieName.shift();
        console.log(userInput.toString());
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName.toString() + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function(response){
            
            console.log("* The tiltle of the Movie : " + response.data.Title);
            console.log("* The Released Year : " + response.data.Year);
            console.log("* The Discription : " + response.data.Plot);
            console.log("* IMDB Rating of the Movie : " + response.data.imdbRating);  
            console.log("* Rotten Tomatoes Rating of the moive : " + response.data.Ratings[1].Value);
            console.log("* Country where the movie was produced : " + response.data.Country);
            console.log("* Language of the movie : " + response.data.Language);
            console.log("* Actors in the movie : " + response.data.Actors);
        });
}