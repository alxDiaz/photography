const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    title: String,
    description: String,
    picture: String,
    neighborhood: { type: Schema.Types.ObjectId, ref: 'Neighborhood' },
    status: Boolean,
    location: { type: String  , coordinates: [ 40, 5]  },
    party: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Meeting =  mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;