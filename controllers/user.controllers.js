import { request, response } from "express";
import { UserQueries } from "../queries/user.query.js";

    export class UserController {

        async create(req, res){
            const body = req.body;
            const query = await UserQueries.store(body);
            if (query){
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo crear el usuario'});
            }
        }

        async findOne(req, res){
            const body = req.body;
            const condition = body.condition;
            const query = await UserQueries.findOne(condition);

            if(query){
                
                return res.status(200).json({ ok: true, data: query.data});
            } else {
                return res.status(403).json({ ok: false, message: 'No se pudo encontrar al usuario: ', body});
            }
        }

        async login(req, res){
            const body = req.body;
            console.log(body);

            const query = await UserQueries.findOne({
                username: body.username,
                password: body.password
            });

            if(query){
                try {
                    console.log('Se validó satisfactoriamente al usuario: ' + body.username );
                    
                    return res.status(200).send({
                        ok: true,
                        data: query.data
                    });
                } catch (e) {
                    return res.status(400).send({
                        ok: false,
                        data: null
                    });
                }
            } else {
                console.log('Comprobar información.');
            }
        }

    }

    export const userController = new UserController();