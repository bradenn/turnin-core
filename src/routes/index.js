import {Router} from 'express';
import {authValidator} from "../validators";
import login from './login';
import course from './course';
import dashboard from './dashboard';

let router = Router();

router.use('/login', login);

/* This middleware requires trailing routes to have a valid session id */
router.use(authValidator.validateSession);

router.use('/', dashboard);
router.use('/courses', course);

export default router;
