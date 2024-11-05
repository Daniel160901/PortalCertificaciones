import { resultadoQueries } from "../queries/resultado.query.js";
import { response, request } from "express";

class ResultadoController {

    async create(req, res) {
        const body = req.body;
        const query = await resultadoQueries.store(body);
        if (query) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(400).json({ ok: false, message: 'No se pudo crear el resultado.' });
        }
    }

    async findAll(req, res) {
        const condition = req.query;

        const query = await resultadoQueries.findAll(condition);
        if (query.ok) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(403).json({ ok: false, data: null, message: 'No se pudieron encontrar los resultados.' })
        }
    }

    async findOne(req, res) {
        try {
            const condition = req.query;

            const query = await resultadoQueries.findOne(condition);

            if (query.ok) {
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar el resultado' });
            }
        } catch (error) {
            console.log('Error al encontrar el resultado.', error);
            return res.status(500).json({ ok: false, message: 'Error en el servidor', error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const identifier = req.params.id;

            const query = await resultadoQueries.delete(identifier);
            if (query.ok) {
                return res.status(200).json({ ok: true, message: 'Se eliminó el resultado' });
            } else {
                console.log('El resultado no se pudo eliminar.');
                return res.status(400).json({ ok: false, message: 'No se pudo eliminar el resultado' });
            }
        } catch (error) {
            console.error('Error al eliminar el resultado.', error);
            return res.status(404).json({ ok: false, message: 'No se pudo eliminar el resultado especificado' });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const datos = req.body;

            const query = await resultadoQueries.update(id, datos);
            if (query) {
                console.log('Se logró actualizar el resultado: ' + id);
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(404).json({ ok: false, data: null, message: 'resultado no actualizado.' });
            }
        } catch (error) {
            return res.status(500).json({ ok: false, data: null, message: 'Error en el servidor', error });
        }
    }
}

export const resultadoController = new ResultadoController();