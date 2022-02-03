import mongoose from 'mongoose';
import Joi from 'joi';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    is_organizer: {
        type: Boolean,
        require: true
    },
    verified: {
        type: Boolean,
        require: false
    }
});

const User = mongoose.model("user", userSchema);

const validate = (user) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string.password().required(),
      is_organizer: Joi.boolean(),
      verified: Joi.boolean()
    });
    return schema.validate(user);
};

export { 
    User,
    validate,
};