// Place your server entry point code here
const express = require('express')
const app = express()
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))
if (args.help) {
    console.log(`server.js [options]

    --port	Set the port number for the server to listen on. Must be an integer
                between 1 and 65535.
  
    --debug	If set to \`true\`, creates endpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws 
                an error with the message "Error test successful." Defaults to 
                \`false\`.
  
    --log	If set to false, no log files are written. Defaults to true.
                Logs are always written to database.
  
    --help	Return this message and exit.`)
    process.exit(0)
}

const port = args.port || process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

app.use(require('./src/middleware/logging.js'))

if (args.log) {
    const fs = require('fs')
    const morgan = require('morgan')
    const loggingStream = fs.createWriteStream('./data/log/access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: loggingStream }))
}


app.get('/app/', (req, res, next) => {
    res.status(200)
    res.send("working!")
});


app.use(require("./src/routes/flipRoutes"))

if (args.debug) {
    app.use(require("./src/routes/debugRoutes"))
}

app.use(function(req, res, next) {
    res.status(404);
    res.send('404 Not Found')
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server stopped')
    })
})