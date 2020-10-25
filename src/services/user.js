import User from '../models/user';

export default {

    async authenticateUser(username, password) {
        const userRecord = await User.authenticate(username, password);
        if(!userRecord) throw new Error('Authentication Failed');
        return userRecord;
    },
    async removeCourse(courseId) {
        const courseRecord = await Course.findByIdAndDelete(courseId);
        if (!courseRecord) throw new Error('Failed to remove record');
        return courseRecord;
    }

}
