import { DataTypes, Model } from "sequelize";
import { DatabaseConfig } from "../config/database.js";
import {UserModel} from "./user.model.js";

export class InstitucionModel extends Model{}

    InstitucionModel.init({
        id_institucion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_inst: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        logo_inst: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: DatabaseConfig,
        tableName: 'instituciones',
        timestamps: false
    });