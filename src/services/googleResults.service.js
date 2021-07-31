var config = require("../config/config-dev.json")
var http = require("http");

class GoogleResultsService {
    static async getResults(searchQuery) {
        var API_KEY = config.SERP_API_KEY;
        var options = {
            host: encodeURI("api.serpstack.com"),
            path: encodeURI("/search?access_key=" + API_KEY + "&query=" + searchQuery + "&num=10&output=json")
        }
        return new Promise((resolve, reject) => {
            http.request(options, (response) => {
                response.setEncoding('utf-8')
                // console.log(response);
                var body = "";
                response.on("data", data => {
                    body += data;
                })
                response.on("end", () => {
                    let res = JSON.parse(body)
                    // console.log(body.organic_results);
                    // console.log("here")
                    resolve(res.organic_results);
                })
            }).end()
        })
    }

    static async getCourseResults(searchQuery) {
        var API_KEY = config.SERP_API_KEY;
        var options = {
            host: encodeURI("api.serpstack.com"),
            path: encodeURI("/search?access_key=" + API_KEY + "&query=" + searchQuery + "&num=10&output=json")
        }
        return new Promise((resolve, reject) => {
            http.request(options, (response) => {
                response.setEncoding('utf-8')

                var body = "";
                response.on("data", data => {
                    body += data;
                })

                response.on("end", () => {
                    let res = JSON.parse(body)
                    resolve(res.organic_results);
                })
            }).end();
        })
    }
}

module.exports.GoogleResultsService = GoogleResultsService;