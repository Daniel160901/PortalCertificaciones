import { DataTypes, Model } from "sequelize";
import { DatabaseConfig } from "../config/database.js";

export class ResultadoModel extends Model{}

    ResultadoModel.init({
        id_resultado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        porcentaje: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        tiempo: {
            type: DataTypes.TIME,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        intentos: {
            type: DataTypes.INTEGER,
        }
    },{
        sequelize: DatabaseConfig,
        tableName: 'resultados',
        timestamps: true
    })