"use strict";

module.exports = function(sequelize, DataTypes) {
    const PersonaEnGrupo = sequelize.define("PersonaEnGrupo", {
        personaEnGrupo_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        grupo_id : DataTypes.INTEGER,
        persona_id : DataTypes.INTEGER,
        rol: DataTypes.STRING
    });

    PersonaEnGrupo.associate = function(models) {
        PersonaEnGrupo.belongsTo(models.Grupo,{
            foreignKey: 'grupo_id'
        });
        PersonaEnGrupo.belongsTo(models.Persona,{
            foreignKey: 'persona_id'
        });
    };

    return PersonaEnGrupo;
};
