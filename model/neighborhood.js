const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodSchema = new Schema({
    name: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Neighborhood =  mongoose.model('Neighborhood', neighborhoodSchema);

module.exports = Neighborhood;