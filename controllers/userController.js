const User = require("../models/User");

// 📌 Obtener todos los usuarios (solo Admin o Manager)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Actualizar usuario (puede hacerlo el propio usuario o un Admin)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Solo un admin puede cambiar el rol
    if (role && req.user.role !== "admin") {
      return res.status(403).json({ message: "No tienes permiso para cambiar el rol" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 📌 Eliminar usuario (solo Admin)
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};