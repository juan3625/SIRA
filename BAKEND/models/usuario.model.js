const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
      },
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: { msg: "Este correo ya está registrado" },
      validate: {
        isEmail: { msg: "Debe ser un correo electrónico válido" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // Se almacena el hash (ej. bcrypt), nunca la contraseña en texto plano
    },
    rol: {
      type: DataTypes.ENUM("aprendiz", "instructor", "admin"),
      allowNull: false,
      defaultValue: "aprendiz",
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] }, // nunca devolver el password por defecto
    },
    scopes: {
      conPassword: { attributes: {} }, // usar Usuario.scope("conPassword") solo para login
    },
  }
);

module.exports = Usuario;
