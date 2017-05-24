const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastName: String,
    password: String,
    avatar: String,
    birthDate: Date,
    mail: String,
    neighborhood: { type: Schema.Types.ObjectId, ref: 'Neighborhood' },
    role: {
        type: String,
        enum: ['ADMIN','USER'],
        default: 'USER',
    },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const User =  mongoose.model('User', userSchema);

module.exports = User;