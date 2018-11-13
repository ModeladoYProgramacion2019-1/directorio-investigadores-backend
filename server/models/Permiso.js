"use strict";

module.exports = function(sequelize, DataTypes) {
    const Permiso = sequelize.define("Permiso", {
        permiso_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
        nombre: DataTypes.TEXT,
        descripcion: DataTypes.TEXT,
        recurso: DataTypes.TEXT,
        crear: {type: DataTypes.BOOLEAN, defaultValue: false},
        leer: {type: DataTypes.BOOLEAN, defaultValue: false},
        actualizar: {type: DataTypes.BOOLEAN, defaultValue: false},
        borrar: {type: DataTypes.BOOLEAN, defaultValue: false},
        activado: {type: DataTypes.BOOLEAN, defaultValue: true}
    });

    Permiso.associate = function(models) {
        Permiso.belongsToMany(models.Rol,{
            foreignKey: 'permiso_id',
            through: models.PermisoEnRol
        });
    };

    return Permiso;
};
