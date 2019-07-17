const http = require('http');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end('<h1>Hello World!</h1>');
});


server.listen(port, hostname, () => {
    console.log('server is listening at ' +
        hostname + " " + port);
});