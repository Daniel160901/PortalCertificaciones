import { CertificadoModel } from "../models/certificado.model.js";
import { CursoModel } from "../models/curso.model.js";
import { RelacionCertUsCo } from "../models/relacionCertUsCo.model.js";
import { UserModel } from "../models/user.model.js";
import { CertificadoQueries } from "./certificado.query.js";

class RelacionCertUsCoQueries {

    async crearRelacion(datos) {
        try {
            const query = await RelacionCertUsCo.create(datos);
            if (query) {
                console.log('Todo salió bien.');
                return { ok: true, data: query };
            } else {
                console.log('No se pudo crear el certificado con la relacion.');
                return { ok: false, data: null }
            }
        } catch (error) {
            console.log('Verificar información del certificado.');
            return { ok: false, message: 'Hubo un problema en el servidor', data: null };
        }
    }

    async findAll(condition = {}) {
        try {
            let datos = [];
            console.log(condition);
            
            const query = await RelacionCertUsCo.findAll({
                where: condition,
                include: [
                    {
                        model: UserModel,
                        attributes: ['nombre', 'app', 'apm'],
                        required: true
                    },
                    {
                        model: CertificadoModel,
                        attributes: ['folio', 'fecha_expira'],
                        required: true,
                    },
                    {
                        
                        model: CursoModel,
                        attributes: ['nombre_curso', 'duracion'],
                        required: true,
                    }
                ]
            });
            if (query.length > 0) {
                
                datos = query.map(item => ({
                    nombre_curso: item.CursoModel.dataValues.nombre_curso,
                    duracion: item.CursoModel.dataValues.duracion,
                    folio: item.CertificadoModel.dataValues.folio,
                    fecha_expira: item.CertificadoModel.dataValues.fecha_expira
                }));

                return { ok: true, data: datos};         
            } else {
                return { ok: false, data: null, message: 'No se obtuvo el certificado.' };
            }
        } catch (error) {
            console.log('No se pudo obtener todos los datos del certificado,.', error);
            return { ok: false, data: null };
        }
    }

    async findOne(condition = {}) {
        try {
            let datos = [];            
            const cert = await CertificadoQueries.findOne(condition);
            const cond = cert.data.dataValues.id_certificado;

            const query = await RelacionCertUsCo.findAll({
                where: {id_certificado: cond},
                include: [
                    {
                        model: UserModel,
                        attributes: ['nombre', 'app', 'apm'],
                        required: true
                    },
                    {
                        model: CertificadoModel,
                        attributes: ['folio', 'fecha_expira'],
                        required: true,
                    },
                    {
                        
                        model: CursoModel,
                        attributes: ['nombre_curso', 'duracion'],
                        required: true,
                    }
                ]
            });
            if (query.length > 0) {
                
                datos = query.map(item => ({
                    nombre_completo: item.UserModel.dataValues.nombre + ' ' + item.UserModel.dataValues.app + ' ' + item.UserModel.dataValues.apm,
                    nombre_curso: item.CursoModel.dataValues.nombre_curso,
                    duracion: item.CursoModel.dataValues.duracion,
                    folio: item.CertificadoModel.dataValues.folio,
                    fecha_expira: item.CertificadoModel.dataValues.fecha_expira
                }));

                return { ok: true, data: datos};         
            } else {
                return { ok: false, data: null, message: 'No se obtuvo el certificado.' };
            }
        } catch (error) {
            console.log('No se pudo obtener todos los datos del certificado por medio del folio.', error);
            return { ok: false, data: null };
        }
    }
}

export const relacionCertUsCoQueries = new RelacionCertUsCoQueries();