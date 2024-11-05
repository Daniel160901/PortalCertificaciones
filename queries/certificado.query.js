import { CertificadoModel } from "../models/certificado.model.js";

class certificadoQueries {

    async store(certificado){
        try {
            const query = await CertificadoModel.create(certificado);
            if(query){
                return { ok: true, data: query};
            } else {
                return { ok: false, data: null}
            }
        } catch (error) {
            console.log('Error al crear el certificado', error);
            return{ok: false, data: null};
        }
    }

    async findAll(condition = {}){
        try {
            const query = await CertificadoModel.findAll({where: condition});
            if(query.length>0){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: null, message: 'No se obtuvieron todos los certificados.'}
            }
        } catch (error) {
            console.log('No se pudieron obtener todos los certificados.');
            return { ok: false, data: null};
        }
    }

    async findOne(condition = {}){
        try {
            const query = await CertificadoModel.findOne({ where: condition});
            if (query){
                return { ok: true, data: query };
            } else {
                return { ok: false, data: query};
            }
        } catch (error) {
            console.log('No se pudo encontrar el certificado: ' + data.query);
            return { ok: false, data: null, message: 'No se pudo encontrar el certificado: ' + condition};
        }
    }

}

export const CertificadoQueries = new certificadoQueries();