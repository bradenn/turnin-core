import performance from 'performance-now';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';
import routeLoader from './router.js';
import sessionLoader from './session.js';
import logger from './logger';

let round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

export default async app => {
    let start = performance();
    await expressLoader(app);

    const db = mongooseLoader();
    logger.info(`Mongoose loaded [${round(performance() - start)} ms]`);

    start = performance();
    await sessionLoader(app, db);
    logger.info(`Session loaded [${round(performance() - start)} ms]`);

    start = performance();
    await routeLoader(app);
    logger.info(`Express loaded [${round(performance() - start)} ms]`);
}
