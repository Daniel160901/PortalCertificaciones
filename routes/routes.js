import express from 'express';
import { UserController, userController } from '../controllers/user.controllers.js';
import { UserQueries } from '../queries/user.query.js';

export class Routes {
    /**
     * @param app
     */

    Routes( app = express.application) { 

        app.get('/', (req, res) => {
            res.send('Portal de certificaciones - Backend');
        });


        app.post('/login', userController.login);
        app.post('/create', userController.create);
        app.route('/find_user', userController.findOne).post(userController.findOne);
    }
}