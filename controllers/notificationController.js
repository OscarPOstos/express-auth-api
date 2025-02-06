const users = {}; // Para rastrear las conexiones WebSocket de usuarios

exports.handleWebSocketConnection = (ws, req) => {
  // Extraer ID del usuario autenticado (Se recomienda verificar el token JWT aquí)
  const userId = req.user?.id;
  if (!userId) return ws.close();

  users[userId] = ws;

  console.log(`Usuario conectado: ${userId}`);

  ws.on("message", (message) => {
    console.log(`Mensaje de ${userId}: ${message}`);
  });

  ws.on("close", () => {
    delete users[userId];
    console.log(`Usuario desconectado: ${userId}`);
  });
};

// 📌 Notificar a un usuario
exports.sendNotification = (userId, message) => {
  if (users[userId]) {
    users[userId].send(JSON.stringify({ message }));
  }
};
