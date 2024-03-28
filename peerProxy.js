const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function sendOnlineCount(connections) {
    online = {
        type: "connections",
        online: connections.length,
    };

    connections.forEach((c) => {
        c.ws.send(JSON.stringify(online))
    });
}

function peerProxy(httpServer) {
    const wss = new WebSocketServer({ noServer: true });


    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];

    wss.on('connection', (ws)=> {
        const connection = { id: uuid.v4(), alive: true, ws: ws};
        connections.push(connection);
        sendOnlineCount(connections);

        ws.on('message', function message(data) {
            const strData = data.toString('utf-8');
            connections.forEach((c) => {
                if (c.id !== connection.id) {
                    console.log(strData)
                    c.ws.send(strData);
                }
            });
        });

        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);

            if (pos >0) {
                connections.splice(pos, 1);
            }
            sendOnlineCount(connections);
        })

        ws.on('pong', () => {
            connection.alive = true;
        });

        setInterval(() => {
            connections.forEach((c) => {
                if(!c.alive) {
                    c.ws.terminate();
                } else {
                    c.alive = false;
                    c.ws.ping();
                }
            });
        }, 10000);
    })
    
}

module.exports = { peerProxy };