import UserModel from "../models/user.model.js";

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
            const query = await UserModel.findAll({where: condition});
            if(query){
                return { ok: true, data: query};
            }
        } catch (e) {
            console.log('Error al encontrar a todos los usuarios de la institucion: ' , condition);
        }
    }

    async findOne(condition={}){
        try {
            const query = await UserModel.findOne({where: condition});
            if (query){
                return { ok: true, data: query }
            }
        } catch (e) {
            console.log('Error al encontrar al usuario.');
            
        }
    }
}

export const UserQueries = new userQueries();