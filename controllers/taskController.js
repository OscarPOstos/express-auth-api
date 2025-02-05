const Task = require("../models/Task");

// 📌 Obtener todas las tareas del usuario autenticado
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Obtener una tarea por ID (solo si pertenece al usuario)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, user: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Actualizar una tarea (solo si pertenece al usuario)
exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Eliminar una tarea (solo si pertenece al usuario)
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deletedTask) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};