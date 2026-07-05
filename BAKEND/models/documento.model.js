const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ajusta la ruta a tu conexión Sequelize
const Usuario = require("./usuario.model"); // Asumiendo que ya tienes un modelo Usuario

const Documento = sequelize.define(
  "Documento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El título no puede estar vacío" },
        len: {
          args: [3, 150],
          msg: "El título debe tener entre 3 y 150 caracteres",
        },
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ruta_archivo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    formato: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tamano: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
  },
  {
    tableName: "documentos",
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

// Relación: un Usuario puede tener muchos Documentos
Documento.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasMany(Documento, { foreignKey: "usuarioId", as: "documentos" });

module.exports = Documento;
