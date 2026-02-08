var http = require('http');

http.createServer(function (req, res) {

    // API Route
    if (req.url === "/status") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: "Docker Container Running Successfully 🚀"
        }));
        return;
    }

    // UI Route
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

    res.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>DevOps Training</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
                color: white;
                text-align: center;
                padding-top: 100px;
            }
            .card {
                background: rgba(255,255,255,0.1);
                padding: 40px;
                border-radius: 15px;
                width: 400px;
                margin: auto;
                box-shadow: 0 0 20px rgba(0,0,0,0.5);
            }
            h1 { color: #00ffd5; }
            button {
                padding: 12px 25px;
                border: none;
                border-radius: 8px;
                background: #00ffd5;
                color: black;
                font-size: 16px;
                cursor: pointer;
                margin-top: 20px;
            }
            button:hover { background: #00c2a8; }
        </style>
    </head>

    <body>
        <div class="card">
            <h1>🚀 Welcome to DevOps Training</h1>
            <p>Application deployed inside Docker on AWS EC2</p>
            <p>Server running on Port 81</p>

            <button onclick="checkDocker()">Check Container</button>
            <p id="msg"></p>
        </div>

        <script>
            function checkDocker(){
                fetch('/status')
                .then(res => res.json())
                .then(data => {
                    document.getElementById("msg").innerHTML = data.status;
                });
            }
        </script>
    </body>
    </html>
    `);

    res.end();

}).listen(81);

console.log("Server running at http://localhost:81");
