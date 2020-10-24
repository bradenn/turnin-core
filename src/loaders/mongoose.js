import mongoose from 'mongoose';
import config from '../config';
import logger from './logger';

export default () => {
    /* MongoDB Connection */
    mongoose.connect(config.MONGO, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
    mongoose.set('useCreateIndex', true);

    /* Mongoose Logging */
    let db = mongoose.connection;
    db.on('error', (error) => logger.error('MongoDB connection failed'));
    db.once('open', () => logger.info('MongoDB connection established'));
    return db;
};
