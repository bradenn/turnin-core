import {Router} from 'express';
import course from './course';

let router = Router();

router.use('/courses', course);

export default router;
