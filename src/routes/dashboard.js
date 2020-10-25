import {Router} from 'express';
import {courseService} from '../services';
import logger from "../loaders/logger";

let router = Router();

router.get('/',
    async (req, res, next) => {
        res.render('dashboard');
    });

export default router;
