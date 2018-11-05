"use strict";

module.exports = function(sequelize, DataTypes) {
    const Grupo = sequelize.define("Grupo", {
        grupo_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.TEXT,
        campo_id: DataTypes.INTEGER,
        contacto_id: DataTypes.INTEGER
    });

    Grupo.associate = function(models) {
        Grupo.belongsTo(models.Campo, {
            foreignKey: 'campo_id'
        });
        Grupo.belongsTo(models.Direccion, {
            foreignKey: 'direccion_id'
        })
        Grupo.belongsToMany(models.Institucion, {
            foreignKey: 'grupo_id',
            through: models.GrupoEnInstitucion
        });
        Grupo.belongsToMany(models.Persona,{
            foreignKey: 'grupo_id',
            through: models.PersonaEnGrupo
        })
    };

    return Grupo;
};
