"use strict";

module.exports = function(sequelize, DataTypes) {
    const Persona = sequelize.define("Persona", {
        persona_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: DataTypes.TEXT,
        apellido: DataTypes.TEXT,
        curriculum: DataTypes.TEXT,
        biografia: DataTypes.TEXT,
        sede_id: DataTypes.INTEGER,
        direccion_id: DataTypes.INTEGER,
        contacto_id: DataTypes.INTEGER,
        contraseña: DataTypes.TEXT
    });

    Persona.associate = function(models) {
        Persona.belongsTo(models.Direccion, {
            foreignKey: 'direccion_id'
        });
        Persona.belongsTo(models.Contacto, {
            foreignKey: 'contacto_id'
        });
        Persona.belongsToMany(models.Grupo,{
            foreignKey: 'persona_id',
            through: models.PersonaEnGrupo
        });
        Persona.belongsTo(models.Sede, {
            foreignKey: 'sede_id'
        });
        Persona.hasOne(models.Estudiante, {
            foreignKey: 'persona_id',
            onDelete: 'cascade'
        });
        Persona.hasOne(models.Investigador, {
            foreignKey: 'persona_id',
            onDelete: 'cascade'
        });
        Persona.hasOne(models.Administrador, {
            foreignKey: 'persona_id',
            onDelete: 'cascade'
        });
        Persona.belongsToMany(models.Articulo, {
            foreignKey: 'persona_id',
            through: models.PersonaEnArticulo,
            onDelete: 'cascade'
        });
        Persona.belongsToMany(models.Grupo, {
            foreignKey: 'persona_id',
            through: models.PersonaEnGrupo
        });
    };

    return Persona;
};
