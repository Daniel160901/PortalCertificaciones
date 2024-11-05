import { Model, DataTypes } from "sequelize";
import { DatabaseConfig } from "../config/database.js";

export class ExamenModel extends Model {}

    ExamenModel.init({
        id_examen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre_examen: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id_curso: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize: DatabaseConfig,
        tableName: 'examenes',
        timestamps: false
    });
