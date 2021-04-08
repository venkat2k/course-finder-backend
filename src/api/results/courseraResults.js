global.fetch = require("node-fetch")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


async function getResults(event) {
    const response = await fetch("https://www.coursera.org/search?query=data%20science&")
    const text = await response.text();
    // console.log(text)
    const dom = new JSDOM(text);
    const content = dom.window.document.getElementsByClassName("rc-CourseQueriesSchemaMarkup")
    for (var i = 0; i < content.length; i++)
    {
        console.log(content[i].textContent)
    }
    console.log(content);

    return {}
}

module.exports.getResults = getResults;