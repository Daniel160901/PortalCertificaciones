import { DataTypes, Model } from "sequelize";
import { DatabaseConfig } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { CertificadoModel } from "./certificado.model.js";
import { CursoModel } from "./curso.model.js";

export class RelacionCertUsCo extends Model{}

    RelacionCertUsCo.init({
        id_rel: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'id_user'
            }
        }, 
        id_certificado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CertificadoModel,
                key: 'id_certificado'
            }
        },
        id_curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CursoModel,
                key: 'id_curso'
            }
        }
    }, {
        sequelize: DatabaseConfig,
        tableName: 'relacion_certificado',
        timestamps: false
    });