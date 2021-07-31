const { HTTP_CONSTANTS, DEFAULT_HEADERS } = require("../../constants/application.constants");
const { AuthService } = require("../../services/auth.service");

class Auth {
    static async login(event) {
        return new Promise(async (resolve) => {
            try {
                const { email, password } = JSON.parse(event.body);
                let response = await AuthService.login(email, password);
                resolve({
                    statusCode: HTTP_CONSTANTS.STATUS.SUCCESS,
                    body: JSON.stringify({
                        code: HTTP_CONSTANTS.STATUS.SUCCESS,
                        data: response,
                        status: HTTP_CONSTANTS.TYPE.SUCCESS,
                    }),
                    headers: DEFAULT_HEADERS
                });
            } catch (error) {
                resolve({
                    statusCode: HTTP_CONSTANTS.STATUS.PRECONDITON_FAILED,
                    body: JSON.stringify({
                        error: {
                            code: HTTP_CONSTANTS.STATUS.PRECONDITON_FAILED,
                            message: error,
                            type: HTTP_CONSTANTS.TYPE.PRECONDITON_FAILED,
                        }
                    }),
                    headers: DEFAULT_HEADERS
                });
            }
        });
    }
}

module.exports.login = Auth.login;
