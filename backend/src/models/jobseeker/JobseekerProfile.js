import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degree: String,
  fieldOfStudy: String,
  institution: String,
  university: String,
  gradingType: String,
  score: Number,
  sdate: Date,
  edate: Date
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  position: String,
  orgname: String,
  industry: String,
  jlevel: String,
  role: String,
  sdate: Date,
  edate: Date
}, { _id: false });

const trainingSchema = new mongoose.Schema({
  title: String,
  year: Number,
  institution: String
}, { _id: false });

const awardSchema = new mongoose.Schema({
  title: String,
  institution: String
}, { _id: false });

const socialSchema = new mongoose.Schema({
  name: String,
  url: String
}, { _id: false });

const referenceSchema = new mongoose.Schema({
  name: String,
  position: String,
  email: String,
  company: String
}, { _id: false });

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  image: String,

  fname: String,
  mname: String,
  sname: String,

  currentAddress: {
    district: String,
    municipality: String,
    city: String
  },

  permanentAddress: {
    district: String,
    municipality: String,
    city: String
  },

  dob: Date,
  phone: String,
  gender: String,
  maritalStatus: String,
  license: String,
  vehicle: String,
  jobType: String,
  lookingFor: String,

  about: String,

  skills: [String],
  languages: [{
    name: String,
    reading: String,
    writing: String,
    speaking: String
  }],

  education: [educationSchema],
  experience: [experienceSchema],
  trainings: [trainingSchema],
  awards: [awardSchema],
  socials: [socialSchema],
  references: [referenceSchema],

  profileCompleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export const Profile = mongoose.model("Profile", profileSchema);
