import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

// Username Schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'fist name is required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'first name is required'],
  },
});

// Guardian Schema
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'father occupation is required'],
  },
  fatherContractNo: {
    type: String,
    required: [true, 'fathers contact no is required'],
  },
  motherName: {
    type: String,
    required: [true, 'mothers name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'mothers occupation is required'],
  },
  motherContractNo: {
    type: String,
    required: [true, 'mothers contact no is required'],
  },
});

// Local guardian Schema
const localGuardianSchema = new Schema<LocalGuardian>({
  firstName: {
    type: String,
    required: [true, 'first name of local guardian is required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'last name of local guardian is required'],
  },
});

// Student Schema
const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'date of birth is required'],
  },
  contractNo: {
    type: String,
    required: [true, 'contact no is required'],
  },
  emergencyContractNo: {
    type: String,
    required: [true, 'emergency contract no is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not valid ',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'local guardian is required'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: "isActive can be one of the following: 'active', 'blocked'",
    },
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
