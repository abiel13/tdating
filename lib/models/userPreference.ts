const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  preferredGender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'any'],
    default: 'any',
  },
  ageRange: {
    min: {
      type: Number,
      default: 18,
      min: 18,
    },
    max: {
      type: Number,
      default: 100,
      max: 100,
    },
  },
  maxDistance: {
    type: Number,
    default: 500,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  },
}, {
  timestamps: true,
});

userPreferencesSchema.index({ location: '2dsphere' });

const UserPreferences = mongoose.models.UserPreferences || mongoose.model('UserPreferences', userPreferencesSchema);

export default UserPreferences
