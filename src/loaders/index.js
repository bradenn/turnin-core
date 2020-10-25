import performance from 'performance-now';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';
import routeLoader from './router.js';
import sessionLoader from './session.js';
import logger from './logger';

export default async app => {
    let start = performance();
    const db = await mongooseLoader();
    logger.info(`Mongoose loaded [${Math.round(performance() - start)} ms]`);
    start = performance();
    await expressLoader(app);
    await routeLoader(app);
    logger.info(`Express loaded [${Math.round(performance() - start)} ms]`);
    start = performance();
    await sessionLoader(app, db);
    logger.info(`Session loaded [${Math.round(performance() - start)} ms]`);
}
