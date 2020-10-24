import performance from 'performance-now';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';
import routeLoader from './router.js';
import logger from './logger';

export default async app => {
    let start = performance();
    await mongooseLoader();
    logger.info(`Mongoose loaded successfully [${Math.round(performance() - start)} ms]`);
    start = performance();
    await expressLoader(app);
    await routeLoader(app);
    logger.info(`Express loaded successfully [${Math.round(performance() - start)} ms]`);
}
