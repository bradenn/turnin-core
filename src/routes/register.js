import {Router} from 'express';
import {userService} from '../services';
import {authValidator} from "../validators";
import logger from "../loaders/logger";

let router = Router();

router.get('/',
    async (req, res) => {
        if (req.session) {
            if (typeof req.session.error !== 'undefined') {
                res.locals.error = req.session.error;
            }
        }
        req.session.error = null;
        return res.render('register');
    });

router.post('/', authValidator.validateRegister,
    async (req, res) => {
        try {
            const user = await userService.createUser(req.body);
            if (user) {
                req.session.userid = user._id;
                return res.redirect('/');
            }
        } catch (e) {
            logger.silly(e);
            req.session.error = e;
            return res.redirect('/register');
        }
    });

export default router;
