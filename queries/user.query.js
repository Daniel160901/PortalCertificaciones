import { InstitucionModel } from "../models/institucion.model.js";
import { UserModel } from "../models/user.model.js";

const relacion = [ { model: InstitucionModel, as: 'nombre_inst'}];

class userQueries {

    async store (user){
        try {
            const query = await UserModel.create(user);
            if(query){
                console.log('Se creó el usuario satisfactoriamente.');
                return { ok: true, data: query};
            }
        } catch (e) {
            console.log('Error al crear el usuario', e);
            return { ok: false, data: null};
        }
    }

    async delete (condition = {}) {
        try {
            const query = await UserModel.destroy({where: condition});
            if(query){
                return { ok: true, data: query}
            }
        } catch (e) {
            console.log('Error al eliminar el usuario');
            return { ok: false, data: null};            
        }
    }

    async findAll (condition = {}){
        try {
            const query = await UserModel.findAll({
                where: condition, 
                include: relacion
            });
            if(query.length > 0){
                return { ok: true, data: query};
            } else {
                return { ok: false, message: 'Hubo un problema en la petición.'}
            }
        } catch (e) {
            console.log('Error al encontrar a todos los usuarios de la institucion', e);
            return { ok: false, message: 'Error al encontrar a todos los usuarios'}
        }
    }

    async findOne(condition={}){
        try {
            const query = await UserModel.findOne({where: condition, include: relacion});
            if (query){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: query};
            }
        } catch (e) {
            console.log('Error al encontrar al usuario.');
            return { ok: false, message: 'Ocurrió un error en el servidor'};
        }
    }

    async updUser(id, datos){
        try {
            const user = await UserModel.findByPk(id);
            if(user) {
                await user.update(datos, { fields: Object.keys(datos) });
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error en la actualizacion del usuario', error);
            return null;
        }
    }
}

export const UserQueries = new userQueries();