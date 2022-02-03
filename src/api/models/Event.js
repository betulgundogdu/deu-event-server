
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
    duration: {
        type: Timestamp,
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
        require: false
    },
    organizer: {
        type: Schema.Types.ObjectId,
        require: true
    },
    attendees: {
        type: [Schema.Types.ObjectId],
        require: false
    }
});

export default mongoose.model('Event', eventSchema, "events");