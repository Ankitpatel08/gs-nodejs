/**
 * Node JS: Javascript runtime; based on js engine: v8 (google)
 * Run JS code anywhere
 * Code Modules: http, https, fs, path, os
 */

// need to import module
const http = require('http');
const fs = require('fs');

// creating server which will accept request
const server = http.createServer((req, res) => {
    // read request data
    console.log('request', req.url);

    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write(`
            <html>
                <head>
                    <title> Enter Message</title>
                </head>
                <body>
                    <form action="/message" method="post">
                        <input type="text" name="message" />
                        <button type="submit">Click me!</button>
                    </form>
                </body>
            </html>
        `);

        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);

            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                // res.writeHead(302, {Location: '/'});
                return res.end();
            });
        });
    }

    // hard exit event loop
    // process.exit();
});

// define port for created server
server.listen(3000);
