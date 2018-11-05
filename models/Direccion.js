"use strict";

module.exports = function(sequelize, DataTypes) {
    const Direccion = sequelize.define("Direccion", {
        direccion_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        estado: DataTypes.TEXT,
        ciudad: DataTypes.TEXT,
        calle: DataTypes.TEXT,
        municipo: DataTypes.TEXT,
        colonia: DataTypes.TEXT,
        numero_interior: DataTypes.INTEGER,
        numero_exterior: DataTypes.INTEGER,
        cp: DataTypes.INTEGER,
        referencias: DataTypes.TEXT,
        edificio: DataTypes.TEXT,
        piso: DataTypes.TEXT,
        cubiculo: DataTypes.TEXT
    });

    Direccion.associate = function(models) {
        Direccion.hasMany(models.Sede, {
            foreignKey: 'direccion_id'
        });
        Direccion.hasMany(models.Persona,{
            foreignKey: 'direccion_id'
        });
    };

    return Direccion;
};
