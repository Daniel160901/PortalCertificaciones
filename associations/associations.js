import { UserModel } from "../models/user.model.js";
import { InstitucionModel } from "../models/institucion.model.js";
import { CertificadoModel } from "../models/certificado.model.js";
import { CursoModel } from "../models/curso.model.js";
import { RelacionCertUsCo } from "../models/relacionCertUsCo.model.js";
import { ExamenModel } from "../models/examen.model.js";
import { PreguntaModel } from "../models/pregunta.model.js";
import { ResultadoModel } from "../models/resultado.model.js";

export function Relaciones(){

    //Relacion de Usuarios a Institución
    UserModel.belongsTo(InstitucionModel, { foreignKey: 'institucion', targetKey: 'id_institucion',as: 'nombre_inst'});
    InstitucionModel.hasMany(UserModel, { foreignKey: 'institucion',  sourceKey: 'id_institucion', as: 'usuarios'});

    //Relacion de certificado-usuario-curso
    RelacionCertUsCo.belongsTo(UserModel, { foreignKey: 'id_usuario'});
    RelacionCertUsCo.belongsTo(CursoModel, { foreignKey: 'id_curso'});
    RelacionCertUsCo.belongsTo(CertificadoModel, { foreignKey: 'id_certificado'});

    //Relacion de Preguntas a Examen
    ExamenModel.hasMany(PreguntaModel, { foreignKey: 'id_examen', as: 'preguntas'});
    PreguntaModel.belongsTo(ExamenModel, { foreignKey: 'id_examen', as: 'examen'});

    //Relacion resultados
    UserModel.belongsToMany(ExamenModel, { foreignKey: 'id_usuario', through: ResultadoModel});
    ExamenModel.belongsToMany(UserModel, { foreignKey: 'id_examen', through: ResultadoModel});

    UserModel.hasMany(ResultadoModel, { foreignKey: 'id_usuario'});
    ExamenModel.hasMany(ResultadoModel, { foreignKey: 'id_examen'});
    ResultadoModel.belongsTo(UserModel, { foreignKey: 'id_usuario'});
    ResultadoModel.belongsTo(ExamenModel, { foreignKey: 'id_examen'});
}