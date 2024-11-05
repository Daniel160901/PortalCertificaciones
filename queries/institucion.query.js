import { InstitucionModel } from "../models/institucion.model.js";

class InstitucionQueries {

    async store(institucion){
        try {
            const query = await InstitucionModel.create(institucion);
            if(query){
                return { ok: true, data: query};
            } else {
                return { ok: false, data: null}
            }
        } catch (error) {
            console.log('Error al crear la institucion', error);
            return{ok: false, data: null};
        }
    }

    async findAll(condition = {}){
        try {
            const query = await InstitucionModel.findAll({where: condition});
            if(query.length>0){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null, message: 'No se obtuvieron todas las instituciones.'}
            }
        } catch (error) {
            console.log('No se pudieron obtener todas las instituciones.');
            return { ok: false, data: null};
        }
    }

    async findOne(condition = {}){
        try {
            const query = await InstitucionModel.findOne({ where: condition});
            if (query){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: query};
            }
        } catch (error) {
            console.log('No se pudo encontrar la institucion: ' + data.query);
            return { ok: false, data: null, message: 'No se pudo encontrar la institucion: ' + condition};
        }
    }

    async delete(id){
        try {
            const query = await InstitucionModel.destroy({ where: { id_institucion: id}});
            if(query){
                return { ok: true};
            } else {
                return { ok:false };
            }
        } catch (error) {
            console.error('Ocurrió un error', error);
            return { ok: false, message: 'Error en el servidor.'}
        }
    }

    async update(id, datos){
        try {
            const query = await InstitucionModel.findByPk(id);
            if(query) {
                await query.update(datos, { fields: Object.keys(datos) });
                return query;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error en la actualizacion de la institucion', error);
            return null;
        }
    }
}

export const institucionQueries = new InstitucionQueries();