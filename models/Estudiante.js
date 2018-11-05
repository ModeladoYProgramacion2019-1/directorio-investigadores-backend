"use strict";

module.exports = function(sequelize, DataTypes) {
    const Estudiante = sequelize.define("Estudiante", {
        estudiante_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nivel_estudiando: DataTypes.TEXT,
        maximo_grado: DataTypes.TEXT,
        fecha_graduacion: DataTypes.DATE,
        persona_id: DataTypes.INTEGER,
        investigador_id: DataTypes.INTEGER,
        campo_id: DataTypes.INTEGER,
        rol_id: DataTypes.INTEGER
    });

    Estudiante.associate = function(models) {
        Estudiante.belongsTo(models.Persona, {
            foreignKey: 'persona_id'
        });
        Estudiante.belongsTo(models.Investigador, {
            foreignKey: 'investigador_id'
        });
        Estudiante.belongsTo(models.Campo, {
            foreignKey: 'campo_id'
        });
        Estudiante.belongsTo(models.Rol, {
            foreignKey: 'rol_id'
        });
    };

    return Estudiante;
};
