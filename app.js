require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


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
