import logger from './logger';

process.on('unhandledRejection', (reason, p) => {
    logger.crit(reason);
    throw reason;
});

process.on('uncaughtException', (error) => {
    logger.crit(error.message);
    process.exit(1);
});
