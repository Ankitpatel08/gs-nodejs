
const fs = require('fs');

const requestHandler = (req, res) => {
    let url = req.url;
    let method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html lang="en">
                <head>
                    <title>test page</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message" />
                        <button type="submit">Add Text</button>
                    </form>
                </body>
            </html>
        `);
    
        return res.end();
    }
    
    if (url === '/message' && method === 'POST') {
        let body = [];
        let existingContent = fs.readFileSync('message.txt', 'utf-8');
    
        // callback triggered whenever chunk of data received
        req.on('data', chunk => {
            // creating array of all chunks to proces later
            body.push(chunk);
        });
    
        // triggred when request end
        return req.on('end', () => {
            // parsing received data using Buffer, 
            let parsedBody = Buffer.concat(body).toString();
            // data send in post: message=<text>
            let message = parsedBody.split('=')[1];
            message = existingContent + message;
    
            fs.writeFile('message.txt', message, (error) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                // res.writeHead(302, {'Location': '/'});
    
                return res.end();
            });
        });
    }

    res.statusCode = 404;
    res.end();
};

// export any module in node
// module.exports = {
//     handler: requestHandler,
//     message: 'Some Text'
// };

// module.exports = requestHandler;

// module.exports.handler = requestHandler;
// module.exports.message = 'Some Text';

exports.handler = requestHandler;
exports.message = 'Some Text';