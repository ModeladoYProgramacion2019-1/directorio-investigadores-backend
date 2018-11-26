"use strict";

module.exports = function(sequelize, DataTypes) {
    const Sede = sequelize.define("Sede", {
        sede_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.TEXT,
        descripcion: DataTypes.TEXT,
        direccion_id: DataTypes.INTEGER,
        institucion_id: DataTypes.INTEGER,
        contacto_id: DataTypes.INTEGER,
        clave: { type: DataTypes.TEXT, unique: true}
    });

    Sede.associate = function(models) {
        Sede.belongsTo(models.Direccion, {
            foreignKey: 'direccion_id'
        });
        Sede.belongsTo(models.Institucion, {
            foreignKey: 'institucion_id'
        });
        Sede.hasMany(models.Persona,{
            foreignKey: 'sede_id',
            onDelete: 'cascade'
        });
        Sede.belongsTo(models.Contacto, {
            foreignKey: 'contacto_id'
        })
    };

    return Sede;
};
