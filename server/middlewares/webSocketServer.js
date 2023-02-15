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
    clients[clientId] = { connection, clientId };

    connection.on('close', () => {
      if (clients[clientId] && clients[clientId].user) {
        loggedInClients--;
        delete clients[clientId];
        console.log('Client Disconnected!');
        broadcastUserCount();
      }
    });

    connection.on('message', async (data, isBinary) => {
      console.log('Message Incoming');
      const message = isBinary ? data : data.toString();
      try {
        const messageJSON = JSON.parse(message);
        if (messageJSON.type === 'SIGN_IN') {
          notifySignIn(clientId, messageJSON);
        }
        if (messageJSON.type === 'SIGN_OUT') {
          notifySignOut(clientId);
        }
        if (messageJSON.type === 'ADMIN_READY') {
          connectToAdmin(clientId);
        }
        if (messageJSON.type === 'BROADCAST_ALL') {
          broadCastAllUsers(messageJSON);
        }
      } catch (ex) {
        console.error(ex);
      }
    });
  });

  server.listen(2309, () => {
    console.log('WebSocket server is up!');
  });
};

const broadcastUserCount = async () => {
  const currentLoggedInUsers = Object.values(clients).map((client) => {
    const { user } = client;
    if (!user) {
      return;
    }
    const { email, photoUrl, displayName } = user;
    return {
      email,
      displayName,
      photoUrl
    };
  });

  for (let client of Object.values(clients)) {
    if (client.user) {
      try {
        const user = await getAuth().verifyIdToken(client.user.idToken);
        if (user.isAdmin /* && client.connection.readyState === WebSocket.OPEN */) {
          console.log(`Notifying ${user.email} About Current User Count`);
          client.connection.send(
            JSON.stringify({
              currentLoggedInUsers
            })
          );
        }
      } catch (ex) {
        if (ex.errorInfo && ex.errorInfo.code === 'auth/id-token-expired') {
          console.log('Sending refresh token request');
          client.connection.send(JSON.stringify({ type: 'REFRESH_TOKEN' }));
          client.connection.terminate();
          delete clients[client.clientId];
        }
        console.error(ex);
      }
    }
  }
};

const notifySignOut = (clientId) => {
  clients[clientId].connection.terminate();
};

const notifySignIn = (clientId, messageJSON) => {
  if (!clients[clientId].isLoggedIn) {
    clients[clientId] = {
      ...clients[clientId],
      ...{ isLoggedIn: true, user: messageJSON.user }
    };
    loggedInClients++;
  }

  broadcastUserCount();
};

const connectToAdmin = async (clientId) => {
  broadcastUserCount();
};

const broadCastAllUsers = async (message) => {
  for (let client of Object.values(clients)) {
    try {
      client.connection.send(
        JSON.stringify({
          ...message
        })
      );
    } catch (ex) {
      console.error(ex);
    }
  }
};

const broadCastUser = (userId, message) => {
  try {
    for (let client of Object.values(clients)) {
      if (client.user && client.user.localId === userId) {
        client.connection.send(
          JSON.stringify({
            ...{ type: 'BROADCAST_ALL' },
            ...message
          })
        );
        return;
      }
    }
  } catch (ex) {
    console.error(ex);
  }
};

module.exports = { webSocketServer, broadCastAllUsers, broadCastUser };
