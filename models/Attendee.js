const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const attendeeCheckedInSchema = new mongoose.Schema({

  id: { type: String, unique: true },
  
}, { timestamps: true });


const checkedIn = mongoose.model('User', attendeeCheckedInSchema);

module.exports = checkedIn;
