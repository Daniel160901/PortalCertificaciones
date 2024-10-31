import { DataTypes, Model, NOW, Sequelize } from "sequelize";
import { DatabaseConfig } from "../config/database";

export class CertificadoModel extends Model{}

    CertificadoModel.init({
        id_certificado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        folio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        fecha_expedido: {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        fecha_expiracion: {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.fn('DATE_ADD', Sequelize.fn('CURDATE'), Sequelize.literal('INTERVAL 1 YEAR')),
            allowNull: false
        },
        

    },  {
        sequelize: DatabaseConfig,
        tableName: 'certificado',
        timestamps: false,
    })