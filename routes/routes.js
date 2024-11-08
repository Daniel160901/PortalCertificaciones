import express from 'express';
import { userController } from '../controllers/user.controllers.js';
import { certificadoController } from '../controllers/certificado.controllers.js';
import { examenController } from '../controllers/examen.controllers.js';
import { cursoController } from '../controllers/curso.controllers.js';
import { preguntaController } from '../controllers/pregunta.controllers.js';
import { institucionController } from '../controllers/institucion.controllers.js';
import { resultadoController } from '../controllers/resultado.controllers.js';
import { relacionCertUsCoController } from '../controllers/relacionCertUsCo.controllers.js';

export class Routes {
    /**
     * @param app
     */

    Routes( app = express.application) {

        //Rutas para USUARIO
        app.post('/login', userController.login);
        app.post('/create_user', userController.create);
        app.post('/find_user', userController.findOne);
        app.put('/update_user/:id', userController.updUser);
        app.get('/find_users', userController.findAll);

        //Rutas para CERTIFICADOS
        app.post('/create_certificado', certificadoController.create);
        app.get('/find_certificados', certificadoController.findAll);
        app.get('/find_certificado', certificadoController.findOne);

        //Rutas para EXAMENES
        app.post('/create_examen', examenController.create);
        app.get('/find_examenes', examenController.findAll);
        app.get('/find_examen', examenController.findOne);
        app.delete('/delete_examen/:id', examenController.delete);
        app.put('/update_examen/:id', examenController.update);
        app.get('/find_examenPreguntas/:id', examenController.findExamenConPreguntas);

        //Rutas para CURSOS
        app.post('/create_curso', cursoController.create);
        app.get('/find_curso', cursoController.findOne);
        app.get('/find_cursos', cursoController.findAll);
        app.delete('/delete_curso/:id', cursoController.delete);
        app.put('/update_curso/:id', cursoController.update);

        //Rutas para PREGUNTAS
        app.post('/create_pregunta', preguntaController.create);
        app.get('/find_pregunta', preguntaController.findOne);
        app.get('/find_preguntas', preguntaController.findAll);
        app.delete('/delete_pregunta/:id', preguntaController.delete);
        app.put('/update_pregunta/:id', preguntaController.update);
        app.get('/find_preguntasExamen/:id', preguntaController.findPreguntasExamen);

        //Rutas para INSTITUCIONES
        app.post('/create_inst', institucionController.create);
        app.get('/find_inst', institucionController.findOne);
        app.get('/find_instituciones', institucionController.findAll);
        app.delete('/delete_inst/:id', institucionController.delete);
        app.put('/update_inst/:id', institucionController.update);

        //Rutas para RESULTADOS
        app.post('/create_resultado', resultadoController.create);
        app.get('/find_resultado', resultadoController.findOne);
        app.get('/find_resultados', resultadoController.findAll);
        app.delete('/delete_resultado/:id', resultadoController.delete);
        app.put('/update_resultado/:id', resultadoController.update);

        //Relacion
        app.get('/buscar', relacionCertUsCoController.findWithUser);
        app.get('/folio', relacionCertUsCoController.findWithFolio);
    }
}