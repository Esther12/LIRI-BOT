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

