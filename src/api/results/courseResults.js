const { GoogleResultsService } = require("../../services/googleResults.service");

global.fetch = require("node-fetch")

async function getResults(event) {
    let searchQuery = event.queryStringParameters.searchQuery;
    let udemyResponseBody = await GoogleResultsService.getCourseResults(searchQuery + " udemy");
    let courseraResponseBody = await GoogleResultsService.getCourseResults(searchQuery + " coursera");
    let edxResponseBody = await GoogleResultsService.getCourseResults(searchQuery + " edx");

    let responseBody = {
        udemy: udemyResponseBody,
        edx: edxResponseBody,
        coursera: courseraResponseBody
    }
    return {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };
}

module.exports.getResults = getResults;