import { request, response } from "express";
import { CertificadoQueries } from "../queries/certificado.query.js";

    export class CertificadoController {

        async create( req, res){
            const body = req.body;
            const query = await CertificadoQueries.store(body);
            if(query){
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                return res.status(400).json({ ok: false, message: 'No se pudo crear el certificado.'});
            }
        }

        async findAll(req, res){
            const condition = req.query;

            const query = await CertificadoQueries.findAll(condition);
            if(query.ok){
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                return res.status(403).json({ ok: false, data: null, message: 'No se pudieron encontrar los certificados.'})
            }
        }

        async findOne(req, res){
            try {
                const condition = req.query;

            const query = await CertificadoQueries.findOne(condition);

            if(query.ok){
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar el certificado'});
            }
            } catch (error) {
                console.log('Error al encontrar el certificado: ', error);
                return res.status(500).json({ ok: false, message: 'Error en el servidor', error: error.message});
            }
        }
        
    }

    export const certificadoController = new CertificadoController();