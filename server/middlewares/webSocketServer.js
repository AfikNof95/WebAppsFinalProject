const { WebSocketServer, WebSocket } = require('ws');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const { getAuth } = require('firebase-admin/auth');

const clients = {};
let loggedInClients = 0;

const webSocketServer = () => {
  const server = http.createServer();
  const wsServer = new WebSocketServer({ server });

  wsServer.on('connection', (connection) => {
    console.log('New Client connected');
    const clientId = uuidv4();
    clients[clientId] = { connection };

    connection.on('close', () => {
      if (clients[clientId].isLoggedIn) {
        loggedInClients--;
      }
      delete clients[clientId];
    });

    connection.on('message', async (data, isBinary) => {
      const message = isBinary ? data : data.toString();
      try {
        const messageJSON = JSON.parse(message);
        if (messageJSON.type === 'LOGIN') {
          notifyLogin(clientId, messageJSON);
        }
        if (messageJSON.type === 'ADMIN_READY') {
          connectToAdmin(clientId);
        }
      } catch (ex) {
        console.error(ex);
      }
    });
  });

  server.listen(8000, () => {
    console.log('WebSocket server is up!');
  });
};

const notifyLogin = async (clientId, messageJSON) => {
  clients[clientId] = {
    ...clients[clientId],
    ...{ isLoggedIn: true, user: messageJSON.user }
  };
  loggedInClients++;
  for (let client of Object.values(clients)) {
    if (client.user) {
      try {
        const user = await getAuth().verifyIdToken(client.user.idToken);
        if (user.isAdmin && client.connection.readyState === WebSocket.OPEN) {
          client.connection.send(JSON.stringify({ loggedInClients }));
        }
      } catch (ex) {
        if (ex.errorInfo && ex.errorInfo.code === 'auth/id-token-expired') {
          console.log('Sending refresh token request');
          client.connection.send(JSON.stringify({ type: 'REFRESH_TOKEN' }));
        }
        console.error(ex);
      }
    }
  }
};

const connectToAdmin = async (clientId) => {
  const user = clients[clientId].user;
  if (user) {
    const { isAdmin } = await getAuth().verifyIdToken(user.idToken);
    if (isAdmin) {
      clients[clientId].connection.send(JSON.stringify({ loggedInClients }));
    }
  }
};

module.exports = webSocketServer;
