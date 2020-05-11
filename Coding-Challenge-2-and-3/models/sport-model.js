const mongoose = require('mongoose');

const schema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  num_players: {
    type: Number,
    required: true,
  },
})

const sportsModel = mongoose.model('sports', schema)

module.exports = {
  createSport: async (values) => {
    try {
      return await sportsModel.create(values);
    } catch (error) {
      throw Error(error);
    }
  }
};
