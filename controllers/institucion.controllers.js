import { institucionQueries } from "../queries/institucion.query.js";
import { request, response } from "express";

class InstitucionController {

    async create(req, res) {
        try {
            const body = req.body;
            const query = await institucionQueries.store(body);
            if (query.ok) {
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(400).json({ ok: false, message: 'No se pudo crear la institucion.' });
            }
        } catch (error) {
            console.error('Error en la creación de la institucion', error);
            return res.status(400).json({ ok: false, message: error});
        }
    }

    async findAll(req, res) {
        const condition = req.query;

        const query = await institucionQueries.findAll(condition);
        if (query.ok) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(403).json({ ok: false, data: null, message: 'No se pudieron encontrar las instituciones.' })
        }
    }

    async findOne(req, res) {
        try {
            const condition = req.query;

            const query = await institucionQueries.findOne(condition);

            if (query.ok) {
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar la institucion' });
            }
        } catch (error) {
            console.log('Error al encontrar la institucion.', error);
            return res.status(500).json({ ok: false, message: 'Error en el servidor', error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const identifier = req.params.id;

            const query = await institucionQueries.delete(identifier);
            if (query.ok) {
                return res.status(200).json({ ok: true, message: 'Se eliminó la institucion' });
            } else {
                console.log('la institucion no se pudo eliminar.');
                return res.status(400).json({ ok: false, message: 'No se pudo eliminar la institucion' });
            }
        } catch (error) {
            console.error('Error al eliminar la institucion.', error);
            return res.status(404).json({ ok: false, message: 'No se pudo eliminar la institucion especificada.' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const datos = req.body;

            const query = await institucionQueries.update(id, datos);
            if (query) {
                console.log('Se logró actualizar la institucion: ' + id);
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(404).json({ ok: false, data: null, message: 'institucion no actualizada.' });
            }
        } catch (error) {
            console.error(error);
            
            return res.status(500).json({ ok: false, data: null, message: 'Error en el servidor' });
        }
    }
}

export const institucionController = new InstitucionController();