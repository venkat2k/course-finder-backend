var https = require("https");
var config = require("../config/config-dev.json");
const APPLICATION_CONSTANTS = require("../constants/application.constants");

class YoutubeResults {
    static async getResultIds(searchQuery) {
        console.log("getResultIds - inside")
        var API_KEY = config.YT_API_KEY;
        var link = "https://youtube.googleapis.com/youtube/v3/search?key=" + API_KEY + "&q=" + searchQuery + "&maxResults=10";
        var encodedURI = encodeURI(link)
        console.log(encodedURI)
        var resultIds = []
        return new Promise((resolve, reject) => {
            
            https.get(encodedURI, (response) => {
                let responseItems;
                response.setEncoding('utf-8')
                var body = "";
                response.on("data", data => {
                    body += data;
                })
                response.on("end", function() {
                    body = JSON.parse(body)
                    // console.log(body)
                    body.items.forEach(element => {
                        // console.log(element)
                        if (element.id.kind == "youtube#playlist") {
                            resultIds.push({
                                type: "playlist",
                                id: element.id.playlistId
                            })
                        }
                        else if (element.id.kind == "youtube#video") {
                            resultIds.push({
                                "type": "video",
                                "id": element.id.videoId
                            })
                        }
                    });
                    // console.log(resultIds)
                    resolve(resultIds); 
                })
                // console.log("getResultIds - outside")
            })
        })
    }
    static async getVideoDetails(videoId) {
        var API_KEY = config.YT_API_KEY;
        var link = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=" + videoId + "&key=" + API_KEY;
        var encodedURI = encodeURI(link)
        var result = {}
        return new Promise((resolve, _reject) => {
            https.get(encodedURI, (response) => {
                var body = "";
                response.on("data", data => {
                    body += data;
                })
                response.on("end", () => {
                    body = JSON.parse(body);
                    // console.log("body", body)
                    var snippet = body.items[0].snippet;
                    var statistics = body.items[0].statistics;
                    var ldRatio = (statistics.likeCount / (statistics.likeCount + statistics.dislikeCount)) * 5;
                    ldRatio = ldRatio.toFixed(2);
                    // console.log(snippet)
                    result = {
                        type: "video",
                        id: videoId,
                        title: snippet.title,
                        channel: snippet.channelTitle,
                        thumbnailURL: snippet.thumbnails.default,
                        description: snippet.description,
                        rating: ldRatio
                    }
                    resolve(result);
                })
            })
        })
    }
    static async getPlaylistDetails(playlistId) {
        var API_KEY = config.YT_API_KEY;
        var link = "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=" + playlistId + "&key=" + API_KEY;
        var encodedURI = encodeURI(link)
        var result = {}
        return new Promise((resolve, _reject) => {
            https.get(encodedURI, (response) => {
                var body = "";
                response.on("data", data => {
                    body += data;
                })
                response.on("end", () => {
                    body = JSON.parse(body);
                    // console.log("body", body)
                    var snippet = body.items[0].snippet;
                    // console.log("snippet", snippet)
                    result = {
                        type: "playlist",
                        id: playlistId,
                        title: snippet.title,
                        channel: snippet.channelTitle,
                        thumbnailURL: snippet.thumbnails.default
                    }
                    resolve(result);
                })
            })
        })
    }
    static async fetchResults(searchQuery) {
        var response = []
        var resultIds = await YoutubeResults.getResultIds(searchQuery);
        console.log(resultIds);
        return new Promise(async (resolve, _reject) => {
            await Promise.all(resultIds.map(async(element) => {
                if (element.type === "video") {
                    var videoDetails = await YoutubeResults.getVideoDetails(element.id);
                    response.push(videoDetails);
                    // console.log(response)
                }
                else {
                    var playlistDetails = await YoutubeResults.getPlaylistDetails(element.id); 
                    response.push(playlistDetails);
                }
            }))
            // resultIds.forEach(async (element) => {
            //     if (element.type === "video") {
            //         var videoDetails = await YoutubeResults.getVideoDetails(element.id);
            //         response.push(videoDetails);
            //         // console.log(response)
            //     }
            //     else {
            //         var playlistDetails = await YoutubeResults.getPlaylistDetails(element.id); 
            //         response.push(playlistDetails);
            //     }
            // })
                console.log("final", response);
                resolve(response);
            // return response;
        })
        
    }
}

module.exports.YoutubeResults = YoutubeResults;