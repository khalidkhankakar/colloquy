import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true // Ensure email is case-insensitive
  },
  gender: {
    type: String,
    lowercase:true,
    required:true,
    enum: ['male', 'female', 'other'], // Predefined options for consistency
    trim: true
  },
  birth: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8 // Enforce minimum password length
  },
  otp: {
    type: String, // Temporary one-time password
    minlength: 6, // Minimum length for security
    maxlength: 6  // Maximum length for consistency
  },
  verify: {
    type: Boolean,
    default: false // User account starts unverified
  },
}, {
  timestamps: true // Include timestamps for creation and modification
});

const User = models.User || model('User', UserSchema);

export default User;