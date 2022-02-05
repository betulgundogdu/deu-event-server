
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        require: true
    },
    end_date: {
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
        require: false
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    attendees: {
        type: [Schema.Types.ObjectId],
        ref: "user",
        require: false
    },
    is_featured: {
        type: Boolean,
    },
    featured_photo: {
        type: String
    }
});

export default mongoose.model('Event', eventSchema, "events");