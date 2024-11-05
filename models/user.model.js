import { Model, DataTypes } from 'sequelize';
import { DatabaseConfig } from '../config/database.js';
import { InstitucionModel } from './institucion.model.js';

export class UserModel extends Model{}

    UserModel.init({
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        app: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        apm: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        institucion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carrera: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },  {
        sequelize: DatabaseConfig,
        tableName: 'usuarios',
        timestamps: true,
    });

