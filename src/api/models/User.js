import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    validation: {
        type: Boolean,
        require: false
    }
});

export default mongoose.model('users', userSchema);