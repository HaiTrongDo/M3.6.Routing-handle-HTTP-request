const http  = require('http')
const url = require('url')
const StringDecoder = require('string_decoder')


let server = http.createServer(function (req, res) {

//get url and parse


    let parseUrl = url.parse(req.url, true);
    console.log(parseUrl);
    let queryStringObject = parseUrl.query;

    res.end('Hello Node Js');
    console.log(queryStringObject);
})
//server start


server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})