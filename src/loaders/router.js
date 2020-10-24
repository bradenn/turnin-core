import routes from '../routes';

export default app => {

    /* Define endpoint prefix */
    app.use('/api/v1', routes);

    /* Catch all unhandled requests */
    app.use((req, res, next) => {
        let err = new Error('Unauthorized.');
        err.status = 401;
        next(err);
    });

    /* Handler all errors */
    app.use((err, req, res, next) => {
        return res.status(err.status || 500).json({error: err.message})
    });

};
