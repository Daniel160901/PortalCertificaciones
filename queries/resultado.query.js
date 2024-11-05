import { ResultadoModel } from "../models/resultado.model.js";

class ResultadoQueries{

    async store(resultado){
        try {
            const query = await ResultadoModel.create(resultado);
            if(query){
                return { ok: true, data: query};
            } else {
                return { ok: false, data: null}
            }
        } catch (error) {
            console.log('Error al crear el resultado', error);
            return{ok: false, data: null};
        }
    }

    async findAll(condition = {}){
        try {
            const query = await ResultadoModel.findAll({where: condition});
            if(query.length>0){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null, message: 'No se obtuvieron todos los resultados.'}
            }
        } catch (error) {
            console.log('No se pudieron obtener todos los resultados.');
            return { ok: false, data: null};
        }
    }

    async findOne(condition = {}){
        try {
            const query = await ResultadoModel.findOne({ where: condition});
            if (query){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: query};
            }
        } catch (error) {
            console.log('No se pudo encontrar el resultado: ' + data.query);
            return { ok: false, data: null, message: 'No se pudo encontrar el resultado.'};
        }
    }

    async delete(id){
        try {
            const query = await ResultadoModel.destroy({ where: { id_resultado: id}});
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
            const query = await ResultadoModel.findByPk(id);
            if(query) {
                await query.update(datos, { fields: Object.keys(datos) });
                return query;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error en la actualizacion del resultado', error);
            return null;
        }
    }


}

export const resultadoQueries = new ResultadoQueries();