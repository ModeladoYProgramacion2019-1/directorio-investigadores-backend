"use strict";

module.exports = function(sequelize, DataTypes) {
    const Administrador = sequelize.define("Administrador", {
        administrador_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_persona: DataTypes.INTEGER,
        id_rol: DataTypes.INTEGER
    });

    Administrador.associate = function(models) {
        Administrador.belongsTo(models.Persona, {
            foreignKey: 'persona_id'
        });
        Administrador.belongsTo(models.Rol, {
            foreignKey: 'rol_id'
        });
    };

    return Administrador;
};
