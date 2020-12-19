import User from '../models/user';

export default {

    async authenticateUser(username, password) {
        const userRecord = await User.authenticate(username, password);
        if(!userRecord) throw new Error('Authentication Failed');
        return userRecord;
    },
    async createUser(user) {
        const userRecord = await User.create(user);
        if(!userRecord) throw new Error('Record Creation Failed');
        return userRecord;
    },
    async validateUserId(userId) {
        const userRecord = await User.findById(userId);
        if (!userRecord) throw new Error('Failed to find user');
        return userRecord;
    }
}
