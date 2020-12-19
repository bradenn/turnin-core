import {Router} from 'express';
import {authValidator} from "../validators";
import login from './login';
import register from './register';
import course from './course';
import submit from './submit';
import dashboard from './dashboard';

let router = Router();

router.use('/login', login);
router.use('/register', register);

/* This middleware requires trailing routes to have a valid session id */
router.use(authValidator.validateSession);
router.use(authValidator.injectLocals);

router.use('/logout', (req, res, next) => {
    req.session.destroy();
    return res.redirect('/login');
})

router.use('/', dashboard);
router.use('/submit', submit);
router.use('/courses', course);

export default router;
