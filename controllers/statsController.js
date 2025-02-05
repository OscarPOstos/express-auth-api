const Task = require("../models/Task");
const User = require("../models/User");

// 📌 Obtener estadísticas de un usuario
exports.getUserStats = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar si el usuario autenticado tiene permiso para ver estas estadísticas
    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({ message: "No tienes permisos para ver estas estadísticas" });
    }

    const totalTasks = await Task.countDocuments({ user: id });
    const completedTasks = await Task.countDocuments({ user: id, completed: true });
    const pendingTasks = totalTasks - completedTasks;

    res.json({ totalTasks, completedTasks, pendingTasks });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Obtener estadísticas generales del equipo (solo Admin)
exports.getTeamStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "No tienes permisos para ver las estadísticas del equipo" });
    }

    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ completed: true });
    const pendingTasks = totalTasks - completedTasks;

    res.json({ totalUsers, totalTasks, completedTasks, pendingTasks });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};