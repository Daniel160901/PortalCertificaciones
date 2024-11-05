import { preguntaQueries } from "../queries/pregunta.query.js";
import { request, response } from "express";

class PreguntaController {

    async create(req, res) {
        try {
            const body = req.body;
            const query = await preguntaQueries.store(body);
            if (query.ok) {
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(400).json({ ok: false, message: 'No se pudo crear la pregunta.' });
            }
        } catch (error) {
            console.error('Error en la creación de la pregunta', error);
            return res.status(400).json({ ok: false, message: error});
        }
    }

    async findAll(req, res) {
        const condition = req.query;

        const query = await preguntaQueries.findAll(condition);
        if (query.ok) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(403).json({ ok: false, data: null, message: 'No se pudieron encontrar las preguntas.' })
        }
    }

    async findOne(req, res) {
        try {
            const condition = req.query;

            const query = await preguntaQueries.findOne(condition);

            if (query.ok) {
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar la pregunta' });
            }
        } catch (error) {
            console.log('Error al encontrar la pregunta.', error);
            return res.status(500).json({ ok: false, message: 'Error en el servidor', error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const identifier = req.params.id;

            const query = await preguntaQueries.delete(identifier);
            if (query.ok) {
                return res.status(200).json({ ok: true, message: 'Se eliminó la pregunta' });
            } else {
                console.log('la pregunta no se pudo eliminar.');
                return res.status(400).json({ ok: false, message: 'No se pudo eliminar la pregunta' });
            }
        } catch (error) {
            console.error('Error al eliminar la pregunta.', error);
            return res.status(404).json({ ok: false, message: 'No se pudo eliminar la pregunta especificada.' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const datos = req.body;

            const query = await preguntaQueries.update(id, datos);
            if (query) {
                console.log('Se logró actualizar la pregunta: ' + id);
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(404).json({ ok: false, data: null, message: 'Pregunta no actualizada.' });
            }
        } catch (error) {
            console.error(error);
            
            return res.status(500).json({ ok: false, data: null, message: 'Error en el servidor' });
        }
    }
}
export const preguntaController = new PreguntaController();