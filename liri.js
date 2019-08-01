require("dotenv").config();
var Spotify = require('node-spotify-api'); 
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
//get user input
var userInput = process.argv.slice(3).join(" ");
// var userInputs = ""
// userInputs = userInput.toString().replace(',','%20');
console.log(userInput);

//get the song name
var songName = "";
if(userInput === " " ){
    songName = "The Sign";
}else{
    songName = userInput;
    console.log(songName);
}
function searchLiri(method, contant){
    if (method === " "){
        method = "do-what-it-says";
    }else{
        switch(method){

            case "movie-this":
                movieSearch(contant);
                break;
            case "concert-this":
                concertSearch(contant);
                break;
            case "spotify-this-song":
                songSearch(contant);
                break;
            case "do-what-it-says":
                getFileSearch(contant);
                break;
            default:
                console.log("ERROR!!!!");
        }
    }
}
// switch(process.argv[2]){

//     case "movie-this":
//         movieSearch();
//         break;
//     case "concert-this":
//         concertSearch();
//         break;
//     case "spotify-this-song":
//         songSearch(songName);
//         break;
//     case "do-what-it-says":
//         getFileSearch();
//         break;
//     default:
//         console.log("ERROR!!!!");
// }

searchLiri(process.argv[2],userInput);
// spotify search the song name

function songSearch(song){
    spotify.search({
        type: 'track',
        query: song,
        limit: 2
    }, function(err, result){
        if(err){
            console.log(err);
        }
        var data = result.tracks.items[0];
        fs.appendFile("log.txt",`
        **************Songs************
        * Artist :  ${data.album.artists[0].name}
        * The song's name :  {data.name}
        * A preview link of the song from Spotify :  ${data.preview_url}
        * The album that the song is from : ${data.album.name}
        `,function(err){
            if (err) throw err;
        });
        console.log("* Artist : " + data.album.artists[0].name);
        console.log("* The song's name : " + data.name);
        console.log("* A preview link of the song from Spotify : " + data.preview_url);
        console.log("* The album that the song is from : " + data.album.name);
    })
}


// OMDB movide Search

function movieSearch(movieName){

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    axios.get(queryUrl).then(
        function(response){
            
            var data = response.data;
            fs.appendFile("log.txt",`
                **************Movies************
                * The tiltle of the Movie :  ${data.Title}
                * The Released Year :  ${data.Year}
                * The Discription :  ${data.Plot}
                * IMDB Rating of the Movie :  ${data.imdbRating}
                * Rotten Tomatoes Rating of the moive :  ${data.Ratings[1].Value}
                * Country where the movie was produced :  ${data.Country}
                * Language of the movie :  ${data.Language}
                * Actors in the movie :  $
                * {data.Actors}
            `,function(err){
                if (err) throw err;
            });
            console.log("* The tiltle of the Movie : " + data.Title);
            console.log("* The Released Year : " + data.Year);
            console.log("* The Discription : " + data.Plot);
            console.log("* IMDB Rating of the Movie : " + data.imdbRating);  
            console.log("* Rotten Tomatoes Rating of the moive : " + data.Ratings[1].Value);
            console.log("* Country where the movie was produced : " + data.Country);
            console.log("* Language of the movie : " + data.Language);
            console.log("* Actors in the movie : " + data.Actors);
        });
}

function getFileSearch(){
    fs.readFile("random.txt", "utf8", function(err,data){
        if(err)
        console.log(err);
        var fileInput = "";
        fileInput = data.split(",");
        console.log(fileInput);
        var num = Math.floor(Math.random()*fileInput.length);
        if((num%2) == 0){
            console.log(num);
        }else{
            num +=1;
            console.log(num);
        }
        var a = "";
        var b = "";
        a = fileInput[num].toString();
        b = fileInput[num+1].toString();
        console.log(a,b);
        searchLiri(a,b);
    })

}

function concertSearch(concertName){

    var queryUrl = "https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response){
            //console.log(data.data);
            var data = response.data[1].venue;
            fs.appendFile("log.txt",`
                **************Concerts************
                * Name of the venue :  ${data.name}
                * Venue location :  ${data.country}   ${data.region}   ${data.city}
                * Date of the Event :  ${moment(response.data[1].datetime).format("MM/DD/YYYY")}
            `,function(err){
                if (err) throw err;
            });
            console.log("* Name of the venue : " + data.name);
            console.log("* Venue location : " + data.country + " " +  data.region + " " +  data.city );
            console.log("* Date of the Event : " + moment(response.data[1].datetime).format("MM/DD/YYYY"));
    })
}