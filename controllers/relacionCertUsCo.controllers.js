import { relacionCertUsCoQueries } from "../queries/relacionCertUsCo.query.js";
import { request, response } from "express";

class RelacionCertUsCoController {

    async findWithUser(req, res) {
        try {
            const condition = req.query;           

            const query = await relacionCertUsCoQueries.findAll(condition);

            if (query.ok) {
                
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar el certificado' });
            }
        } catch (error) {
            console.log('Error al encontrar el certificado: ', error);
            return res.status(500).json({ ok: false, message: 'Error en el servidor', error: error.message });
        }
    }

    async findWithFolio(req, res) {
        try {
            const condition = req.query;           

            const query = await relacionCertUsCoQueries.findOne(condition);

            if (query.ok) {
                
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar el certificado' });
            }
        } catch (error) {
            console.log('Error al encontrar el certificado: ', error);
            return res.status(500).json({ ok: false, message: 'Error en el servidor', error: error.message });
        }
    }
}

export const relacionCertUsCoController = new RelacionCertUsCoController();