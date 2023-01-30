require('dotenv').config()

const environment = process.env.ENVIRONMENT


module.exports = {
    environment: environment,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    tokenKey: process.env.TOKEN_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    user_email:process.env.USER_EMAIL,
    user_password:process.env.USER_PASSWORD
}