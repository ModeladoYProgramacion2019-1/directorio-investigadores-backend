"use strict";

module.exports = function(sequelize, DataTypes) {
    const PersonaEnArticulo = sequelize.define("PersonaEnArticulo", {
        personaEnArticulo_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        articulo_id : DataTypes.INTEGER,
        persona_id : DataTypes.INTEGER,
        rol: DataTypes.STRING
    });

    PersonaEnArticulo.associate = function(models) {
        PersonaEnArticulo.belongsTo(models.Articulo,{
            foreignKey: 'articulo_id'
        });
        PersonaEnArticulo.belongsTo(models.Persona,{
            foreignKey: 'persona_id'
        });
    };

    return PersonaEnArticulo;
};
