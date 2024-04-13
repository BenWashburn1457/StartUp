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
                    console.log(strData);
                    c.ws.send(strData);
                }
            });
        });

        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);
            connections.splice(pos, 1);
            sendOnlineCount(connections);
        });

        ws.on('pong', () => {
            connection.alive = true;
        });
        console.log("running")
        const pingInterval = setInterval(() => {
            console.log("sending ping");
            sendPing(ws);
        }, 10000);

        console.log("Ping interval set up");

    });
}

module.exports = { peerProxy };