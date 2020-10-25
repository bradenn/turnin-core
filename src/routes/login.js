import {Router} from 'express';
import {userService} from '../services';
import logger from "../loaders/logger";

let router = Router();

router.get('/', async (req, res) => {
    return res.render('login');
});

router.post('/',
    async (req, res, next) => {
        const body = req.body;
        try {
            const user = await userService.authenticateUser(body.username, body.password);
            if(user){
                req.session.userid = user._id;
                return res.redirect('/');
            }
        } catch(e) {
            logger.silly(e);

        }
    });

export default router;
