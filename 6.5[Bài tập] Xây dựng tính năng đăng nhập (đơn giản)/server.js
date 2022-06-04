const http = require('http')
const url = require('url')
const fs = require('fs')
const qs = require('qs')
// const router = require("router");
const StringDecoder = require('string_decoder').StringDecoder

const server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true)
    // console.log(parseUrl);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let method = req.method.toLowerCase();

    if(method==='get'){
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        chosenHandler(req, res);
    }
    else{
        let chosenHandler = router.profile;
        chosenHandler(req, res);
    }

}).listen(5000, () => {
    console.log("server is listening on port 5000");
})


let handlers = {};
handlers.home = function (req, res) {
    fs.readFile('./view/home.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handlers.login = function (req, res) {
    fs.readFile('./view/login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}
handlers.notFound = function (req, res) {
    fs.readFile('./view/notfound.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handlers.profile = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk
    });
    req.on('end', () => {
        data = qs.parse(data)
        let name = data.name;
        let stringObject = `<h1>Hello ${name}</h1>`
        console.log(name)
        fs.writeFile('./view/profile.html', stringObject,(err)=>{
            if(err){
                return console.error(err)
            }
            console.log("Ghi du lieu vao file thanh cong!");
            console.log("Doc du lieu vua duoc ghi");
            fs.readFile('./view/profile.html', function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        })

    });
}

let router = {
    'profile': handlers.profile,
    'login': handlers.login,
    'home': handlers.home
}