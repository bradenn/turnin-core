import Course from '../models/course';

export default {

    async createCourse(courseBody){
        const courseRecord = await Course.create(courseBody);
        if(!courseRecord) throw new Error('Failed to create record');
        return courseRecord;
    },
    async removeCourse(courseId){
        const courseRecord = await Course.findByIdAndDelete(courseId);
        if(!courseRecord) throw new Error('Failed to remove record');
        return courseRecord;
    }

}
