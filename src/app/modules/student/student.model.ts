import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from './student.interface';

// Username Schema
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'fist name is required'],
    trim: true,
    maxlength: [20, 'First Name cannot be more then 20 character'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalized format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'first name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

// Guardian Schema
const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'father occupation is required'],
  },
  fatherContractNo: {
    type: String,
    trim: true,
    required: [true, 'fathers contact no is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'mothers name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'mothers occupation is required'],
  },
  motherContractNo: {
    type: String,
    trim: true,
    required: [true, 'mothers contact no is required'],
  },
});

// Local guardian Schema
const localGuardianSchema = new Schema<LocalGuardian>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'first name of local guardian is required'],
  },
  middleName: {
    trim: true,
    type: String,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'last name of local guardian is required'],
  },
});

// Student Schema
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      trim: true,
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
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email',
      },
      unique: true,
    },
    dateOfBirth: {
      type: Date,
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
      trim: true,
      required: [true, 'present address is required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Query middleware
studentSchema.pre('find', function (next) {
  // console.log(this, 'query middleware')
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  // console.log(this, 'query middleware')
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  // console.log(this, 'query middleware')
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName && this?.name?.middleName} ${this?.name?.lastName}`;
});

export const StudentModel = model<TStudent>('Student', studentSchema);
