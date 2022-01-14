
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true
    },
    location: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        require: false
    },
    category: {
        type: String,
        required: false
    },
    organization: {
        type: Schema.Types.ObjectId,
        require: true
    }
});

export default mongoose.model('Event', eventSchema, "events");