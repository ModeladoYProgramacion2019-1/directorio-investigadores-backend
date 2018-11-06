"use strict";

module.exports = function(sequelize, DataTypes) {
    const Campo = sequelize.define("Campo", {
        campo_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.TEXT
    });

    Campo.associate = function(models) {
        Campo.hasMany(models.Estudiante, {
            foreignKey: 'campo_id'
        });
        Campo.hasMany(models.Investigador, {
            foreignKey: 'campo_id'
        });
        Campo.hasMany(models.Grupo, {
            foreignKey: 'campo_id'
        });
        Campo.hasMany(models.Articulo, {
            foreignKey: 'campo_id'
        });
    };

    return Campo;
};
