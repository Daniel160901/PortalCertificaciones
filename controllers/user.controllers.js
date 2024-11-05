import { request, response } from "express";
import { UserQueries } from "../queries/user.query.js";

export class UserController {

    async create(req, res) {
        const body = req.body;
        const query = await UserQueries.store(body);
        if (query) {
            return res.status(200).json({ ok: true, data: query.data });
        } else {
            return res.status(403).json({ ok: false, message: 'No se pudo crear el usuario' });
        }
    }

    async findOne(req, res) {
        try {
            const body = req.body;
            const condition = body.condition;
            const query = await UserQueries.findOne(condition);

            if (query) {
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar al usuario: ', condition });
            }
        } catch (error) {
            console.log('No se encontró el usuario.', error);
            return res.status(400).send({
                ok: false,
                data: null
            });
        }
    }

    async login(req, res) {
        try {
            const body = req.body;
            console.log(body);

            const query = await UserQueries.findOne({
                username: body.username,
                password: body.password
            });

            if (query.ok) {

                console.log('Se validó satisfactoriamente al usuario: ' + body.username);

                return res.status(200).send({
                    ok: true,
                    data: query.data
                });
            } else {
                console.log('Comprobar información.');
                return res.status(403).json({ ok: false, message: 'Datos incorrectos, verifica información.' })
            }
        } catch (e) {
            return res.status(400).send({ ok: false, data: null });
        }
    }


    async updUser(req, res) {
        try {
            const id = req.params.id;
            const datos = req.body;

            const query = await UserQueries.updUser(id, datos);
            if (query) {
                console.log('Se logró actualizar el usuario: ' + id);
                return res.status(200).json({ ok: true, data: query.data });
            } else {
                return res.status(404).json({ ok: false, data: null, message: 'Usuario no encontrado' });
            }
        } catch (error) {
            return res.status(500).json({ ok: false, data: null, message: 'Error en el servidor backend', error });
        }
    }

    async findAll(req, res){
        try {
            const condition = req.query;

            const query = await UserQueries.findAll(condition);
            if(query.ok){
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                console.log('No se pudieron obtener todos los usuarios.');
                return res.status(403).json({ ok: false, data: null, message: 'No se pudieron obtener todos los usuarios.'});
            }
        } catch (error) {
            return res.status(400).json({ok: false, data: null, message: 'Hubo un error en el servidor.'})
        }
    }

}

export const userController = new UserController();