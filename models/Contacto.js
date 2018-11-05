"use strict";

module.exports = function(sequelize, DataTypes) {
    const Contacto = sequelize.define("Contacto", {
        contacto_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        correo_personal: DataTypes.TEXT,
        correo_institucion: DataTypes.TEXT,
        telefono_fijo: DataTypes.TEXT,
        telefono_movil: DataTypes.TEXT,
        sitio_web: DataTypes.TEXT,
        direccion_postal: DataTypes.TEXT
    });

    Contacto.associate = function(models) {
        Contacto.hasMany(models.Sede, {
            foreignKey: 'direccion_id'
        });
        Contacto.hasMany(models.Persona, {
            foreignKey: 'direccion_id'
        });
        Contacto.hasMany(models.Grupo,{
            foreignKey: 'direccion_id'
        });
    };

    return Contacto;
};
