
const APPLICATION_CONSTANTS = {
    HTTP_OK_STATUS: 200
}

const HTTP_CONSTANTS = {
    STATUS: {
        SUCCESS: 200,
        PRECONDITON_FAILED: 400,
    },
    TYPE: {
        SUCCESS: 'Success',
        PRECONDITON_FAILED: 'Business Exception',
    }
};

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
};

module.exports.APPLICATION_CONSTANTS = APPLICATION_CONSTANTS;
module.exports.HTTP_CONSTANTS = HTTP_CONSTANTS;
module.exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
