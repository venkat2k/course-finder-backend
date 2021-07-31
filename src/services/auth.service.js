class AuthService {
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            try {
                console.log(email, password);
                if (email !== 'user@gmail.com') {
                    return reject('Invalid email');
                }
                if (password !== 'password') {
                    return reject('Invalid password');
                }
                resolve({
                    id: 1,
                    name: "User",
                    email: email,
                });
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports.AuthService = AuthService;