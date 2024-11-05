import { DataTypes, Model } from "sequelize";
import { DatabaseConfig } from "../config/database.js";

export class PreguntaModel extends Model{}

    PreguntaModel.init({
        id_pregunta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        material_apoyo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        a: {
           type: DataTypes.STRING,
           allowNull: false
        },
        b: {
            type: DataTypes.STRING,
            allowNull: false
         },
         c: {
            type: DataTypes.STRING,
            allowNull: true
         },
         d: {
            type: DataTypes.STRING,
            allowNull: true
         },
         correcta: {
            type: DataTypes.STRING,
            allowNull: false,
         }
    }, {
        sequelize: DatabaseConfig,
        tableName: 'preguntas',
        timestamps: false
    });