"use strict";

module.exports = function(sequelize, DataTypes) {
    const GrupoEnInstitucion = sequelize.define("GrupoEnInstitucion", {
        grupoEnInstitucion_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        grupo_id : DataTypes.INTEGER,
        institucion_id : DataTypes.INTEGER,
        rol: DataTypes.STRING
    });

    GrupoEnInstitucion.associate = function(models) {
        GrupoEnInstitucion.belongsTo(models.Grupo,{
            foreignKey: 'grupo_id'
        });
        GrupoEnInstitucion.belongsTo(models.Institucion,{
            foreignKey: 'institucion_id'
        });
    };

    return GrupoEnInstitucion;
};
