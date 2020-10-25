

export default {

    async validateSession(req, res, next) {
        if(typeof req.session === 'undefined') return res.redirect('/login');
        next();
    }
}
