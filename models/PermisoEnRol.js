"use strict";

module.exports = function(sequelize, DataTypes) {
    const PermisoEnRol = sequelize.define("PermisoEnRol", {
        permisoEnRol_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        permiso_id : DataTypes.INTEGER,
        rol_id : DataTypes.INTEGER
    });

    PermisoEnRol.associate = function(models) {
        PermisoEnRol.belongsTo(models.Permiso, {
            foreignKey: 'permiso_id'
        });
        PermisoEnRol.belongsTo(models.Rol, {
            foreignKey: 'rol_id'
        });
    };

    return PermisoEnRol;
};
