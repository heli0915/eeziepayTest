import cors from 'cors'

// const corsOptions = {
//     origin: 'http://example.com',
//     optionSuccessStatus: 200
// }

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

module.exports = cors(corsOptions)