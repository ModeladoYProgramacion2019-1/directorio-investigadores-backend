"use strict";

module.exports = function(sequelize, DataTypes) {
    const Rol = sequelize.define("Rol", {
        rol_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  },
        nombre: DataTypes.TEXT,
        descripcion: DataTypes.TEXT,
        tipo: DataTypes.TEXT,
        activado: {type: DataTypes.BOOLEAN, defaultValue: true}
    });

    Rol.associate = function(models) {
        Rol.hasMany(models.Administrador,{
            foreignKey: 'rol_id'
        });
        Rol.hasMany(models.Estudiante,{
            foreignKey: 'rol_id'
        });
        Rol.hasMany(models.Investigador,{
            foreignKey: 'rol_id'
        });
        Rol.belongsToMany(models.Permiso,{
            foreignKey: 'rol_id',
            through: models.PermisoEnRol
        });
    };

    return Rol;
};
