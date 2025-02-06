const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const WebSocket = require("ws");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const statsRoutes = require("./routes/stats");
const integrationRoutes = require("./routes/integration");
const { handleWebSocketConnection } = require("./controllers/notificationController");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const wss = new WebSocket.Server({ server });

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/stats", statsRoutes);

// 📌 Middleware para autenticación en WebSocket
wss.on("connection", (ws, req) => {
    authMiddleware(req, {}, () => handleWebSocketConnection(ws, req));
  });
  
  app.use("/integrations", integrationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));