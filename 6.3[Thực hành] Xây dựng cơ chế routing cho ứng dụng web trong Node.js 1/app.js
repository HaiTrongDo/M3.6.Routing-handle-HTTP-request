let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;


let server = http.createServer((req, res) => {

//definer the handler
    let handlers = {};
//sample handlers
    handlers.sample = function (data, callback) {
// call back
        callback(406, {'name': 'sample handle'})
    };
//not found sample
    handlers.notFound = function (data, callback) {
        callback(404);
    };

//home
    handlers.home = function (data, callback) {
// call back
        callback(200, 'home page');
    };

    let router = {
        'sample': handlers.sample,
        'home': handlers.home,
    }

//get url and parse

    let parseUrl = url.parse(req.url, true);
// //get the path
    let path = parseUrl.pathname;

    let trimPath = path.replace(/^\/+|\/+$/g, '');


    req.on('data', function (data) {
    });
    req.on('end', function (end) {
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        let data=
            {
                "trimPath": trimPath
            };

        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            let payLoadString = JSON.stringify(payload);
            res.writeHead(statusCode)
            res.end(payLoadString);
            //log the request
            console.log("status "+ statusCode + "payload" + payload);
        });
    });
    // console.log(trimPath);



    // res.end();
}).listen(3000,()=>{
    console.log('server is listen on port 3000')})

