const { GoogleResultsService } = require("../../services/googleResults.service");

async function getResults(event) {
    let searchQuery = event.queryStringParameters.searchQuery;
    let responseBody = await GoogleResultsService.getResults(searchQuery);
    // console.log("out",responseBody);
    return {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };
}

module.exports.getResults = getResults;