import { request, response } from "express";
import { CertificadoQueries } from "../queries/certificado.query.js";
import { relacionCertUsCoQueries } from "../queries/relacionCertUsCo.query.js";

export class CertificadoController {

    async create(req, res) {
        try {
            const body = req.body;

            const cert = {
                folio: body.certificado
            }

            const query = await CertificadoQueries.store(cert);
            console.log(body.user, body.course, query.id, ' este es el LOG');

            const datos = {
                id_usuario: body.user,
                id_certificado: query.id,
                id_curso: body.course
            };
            console.log(datos);
            
            if(query.ok){
                const query2 = await relacionCertUsCoQueries.crearRelacion(datos);
                if (query2.ok) {
                    return res.status(200).json({ ok: true, data: query2.data });
                } else {
                    return res.status(400).json({ ok: false, message: 'No se pudo crear la relacion con el certificado.' });
                }
            } else {
                return res.status(400).json({ ok: false, message: 'No se pudo crear el certificado, revisar información ingresada.'})
            }
            
        } catch (error) {
            console.error(error);
            return res.status(403).json({ ok: false, message: 'Hubo un problema en el servidor.', data: null });
        }
    }

    async findAll(req, res) {
        const condition = req.query;

        const query = await CertificadoQueries.findAll(condition);
        if (query.ok) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(403).json({ ok: false, data: null, message: 'No se pudieron encontrar los certificados.' })
        }
    }

    async findOne(req, res) {
        try {
            const condition = req.query;

            const query = await CertificadoQueries.findOne(condition);

            if (query.ok) {
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar el certificado' });
            }
        } catch (error) {
            console.log('Error al encontrar el certificado: ', error);
            return res.status(500).json({ ok: false, message: 'Error en el servidor', error: error.message });
        }
    }

    

}

export const certificadoController = new CertificadoController();