import { PreguntaModel } from "../models/pregunta.model.js";

class PreguntaQueries{

    async store(pregunta){
        try {
            const query = await PreguntaModel.create(pregunta);
            if(query){
                return { ok: true, data: query};
            } else {
                return { ok: false, data: null};
            }
        } catch (error) {
            console.error(error);
            
            return { ok: false, data: null};
        } 
    }

    async findAll(condition = {}){
        try {
            const query = await PreguntaModel.findAll({ where: condition});
            if (query.length>0){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: query};
            }
        } catch (error) {
            console.log('No se pudo encontrar la pregunta.');
            return { ok: false, data: null, message: 'No se pudo encontrar la pregunta.'};
        }
    }

    async findOne(condition = {}){
        try {
            const query = await PreguntaModel.findOne({ where: condition});
            if (query){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null};
            }
        } catch (error) {
            console.log('No se pudo encontrar la pregunta.:');
            return { ok: false, data: null, message: 'No se pudo encontrar la pregunta.'};
        }
    }

    async delete (id){
        try {
            const query = await PreguntaModel.destroy({where: { id_pregunta: id}});
            if(query){
                return { ok: true};
            } else {
                console.log('No se pudo eliminar la pregunta.');
                return { ok: false};
            }
        } catch (error) {
            console.error('Error al eliminar la pregunta.', error);
            return { ok: false, data: null, message: 'Error en la base de datos.'};
        }
    }

    async update(id, datos){
        try {
            const query = await PreguntaModel.findByPk(id);
            if(query) {
                await query.update(datos, { fields: Object.keys(datos) });
                return { ok: true, data: query};
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error en la actualizacion de la pregunta.', error);
            return null;
        }
    }
}
export const preguntaQueries = new PreguntaQueries();