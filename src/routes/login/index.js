import {Router} from 'express';
import {userService} from '../services';
import {authValidator} from "../validators";
import logger from "../loaders/logger";

let router = Router();

router.get('/',
    async (req, res) => {
    if(req.session){
        if(typeof req.session.error !== 'undefined'){
            res.locals.error = req.session.error;
        }
    }
    req.session.error = null;
            return res.render('login');
    });

router.post('/', authValidator.validateLogin,
    async (req, res) => {
        try {
            const user = await userService.authenticateUser(req.body.username, req.body.password);
            if (user) {
                req.session.userid = user._id;
                return res.redirect('/');
            }
        } catch (e) {
            logger.silly(e);
            req.session.error = "Invalid Credentials";
            return res.redirect('/login');
        }
    });

export default router;
