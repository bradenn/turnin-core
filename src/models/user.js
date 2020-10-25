import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        enum: ['student', 'ta', 'instructor', 'admin', 'superadmin'],
        default: 'student'
    },
    dateEdited: {type: Date, default: Date.now},
    dateCreated: {type: Date, default: Date.now}
});

userSchema.statics.authenticate = (user, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({"user": user}).exec().then(user => {
            if (!user) {
                let err = new Error('An account could not be found using that email/password.');
                err.status = 401;
                reject(err);
            }
            verifyHash(password, user.password).then(() => {
                resolve(user);
            }).catch(() => {
                let err = new Error("An account could not be found using that email/password.");
                reject(err);
            });
        });
    });
};

userSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    user.password = await hashPassword(user.password);
    next();
});

let hashPassword = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) reject(new Error(err));
        resolve(hash);
    });
});

let verifyHash = (password, original) => new Promise((resolve, reject) => {
    bcrypt.compare(password, original, function (err, result) {
        if (err) reject(new Error(err));
        if(result) {
            resolve(result);
        }else{
            reject(new Error(err));
        }
    });
});

const User = mongoose.model('User', userSchema);

export default User;
