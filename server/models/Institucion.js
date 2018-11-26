"use strict";

module.exports = function(sequelize, DataTypes) {
    const Institucion = sequelize.define("Institucion", {
        institucion_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.TEXT,
        descripcion: DataTypes.TEXT,
        clave: { type: DataTypes.STRING, unique: true, length: 5}
    });

    Institucion.associate = function(models) {
        Institucion.hasMany(models.Sede, {
            foreignKey: 'institucion_id',
            onDelete: 'cascade'
        });
        Institucion.belongsToMany(models.Grupo,{
            foreignKey: 'institucion_id',
            through: models.GrupoEnInstitucion,
            onDelete: 'cascade'
        });
    };

    return Institucion;
};
