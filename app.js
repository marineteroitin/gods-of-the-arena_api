require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require("morgan");
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(express.json())
app.use(morgan('dev'));

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'my-header,X-Requested-With,content-type,Authorization');
    //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.

    next();
});

/*
    All routes accessible without being authenticated are redirected in publicRoutes
 */

app.use('/api', require('./server/routes/publicRoutes'));

/*
    Handling errors
 */
app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is running on port ${port}.`)
})
