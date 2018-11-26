"use strict";

module.exports = function(sequelize, DataTypes) {
    const Investigador = sequelize.define("Investigador", {
        investigador_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        titulo: DataTypes.TEXT,
        persona_id: DataTypes.INTEGER,
        campo_id: DataTypes.INTEGER,
        rol_id: DataTypes.INTEGER
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
        Investigador.hasMany(models.Estudiante, {
            foreignKey: 'investigador_id'
        })
    };

    return Investigador;
};
