import {userService} from "../services";

export default {

    async validateSession(req, res, next) {
        if (typeof req.session === 'undefined') return res.redirect('/login');
        next();
    },
    async validateAuthorization(req, res, next) {
        try {
            const userRecord = await userService.validateUserId(req.session.userid);
        } catch (e) {
            req.session.error = new Error("Bad Request");
            return res.redirect('/login');
        }
    },
    async injectLocals(req, res, next) {
        if (req.session.userid) {
            res.locals.user = await userService.validateUserId(req.session.userid);
            res.locals.url = req.url;
            return next();
        } else {
            req.session.error = "Authentication Required";
            return res.redirect('/login');
        }
    },
    async validateLogin(req, res, next) {
        const requiredKeys = ['username', 'password'];
        if (!requiredKeys.every(key => Object.keys(req.body).includes(key))) {
            req.session.error = "Missing Keys";
            return res.redirect('/login');
        }
        return next();
    },
    async validateRegister(req, res, next) {
        const requiredKeys = ['username', 'firstname', 'lastname', 'email', 'password'];
        if (!requiredKeys.every(key => Object.keys(req.body).includes(key))) {
            req.session.error = "Missing Keys";
            return res.redirect('/register');
        }
        return next();
    },

}
