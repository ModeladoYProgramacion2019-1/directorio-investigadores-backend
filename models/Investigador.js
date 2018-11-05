"use strict";

module.exports = function(sequelize, DataTypes) {
    const Investigador = sequelize.define("Investigador", {
        investigador_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        titulo: DataTypes.TEXT,
        id_persona: DataTypes.INTEGER,
        id_campo: DataTypes.INTEGER,
        id_rol: DataTypes.INTEGER
    });

    Investigador.associate = function(models) {
        Investigador.belongsTo(models.Persona, {
            foreignKey: 'persona_id'
        });
        Investigador.belongsTo(models.Campo, {
            foreignKey: 'campo_id'
        });
        Investigador.belongsTo(models.Rol, {
            foreignKey: 'rol_id'
        });
    };

    return Investigador;
};
