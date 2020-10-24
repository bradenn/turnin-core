import bodyParser from 'body-parser';

export default app => {

    /* System Health Checks */
    app.route('/status')
        .get((req, res) => res.status(200).end())
        .head((req, res) => res.status(200).end());

    /* Allow the API to receive JSON */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));

    /* Helps with reverse proxy */
    app.enable('trust proxy');

};
