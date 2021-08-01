const { APPLICATION_CONSTANTS } = require("../../constants/application.constants");
const { YoutubeResults } = require("../../services/youtubeResults.service");

async function getResults(event) {
    var searchQuery = event.queryStringParameters.searchQuery;
    console.log(searchQuery)
    var responseBody = await YoutubeResults.fetchResults(searchQuery);
    var response = {
        statusCode: APPLICATION_CONSTANTS.HTTP_OK_STATUS,
        body: JSON.stringify({
            data: responseBody
        })
    }
    return response
}

async function getVideoDetails(event) {
    var videoId = event.queryStringParameters.videoId;
    var responseBody = await YoutubeResults.getVideoDetails(videoId);
    var response = {
        statusCode: APPLICATION_CONSTANTS.HTTP_OK_STATUS,
        body: JSON.stringify({
            data: responseBody
        })
    }
    return response
}
module.exports.getResults = getResults
module.exports.getVideoDetails = getVideoDetails