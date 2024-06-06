import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name must be capitalized',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only letters',
    }),
});

// Guardian Schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContractNo: z.string().trim(),
  motherName: z.string().trim(),
  motherOccupation: z.string().trim(),
  motherContractNo: z.string().trim(),
});

// Local Guardian Schema
const createLocalGuardianValidationSchema = z.object({
  firstName: z.string().trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
});

// Student creation validation Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female']),
      email: z.string().email(),
      dateOfBirth: z.string().optional(),
      contractNo: z.string(),
      emergencyContractNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().url().optional(),
    }),
  }),
});

// Validations for updating Student

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20)
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First Name must be capitalized',
    })
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only letters',
    })
    .optional(),
});

//  Guardian Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContractNo: z.string().trim().optional(),
  motherName: z.string().trim().optional(),
  motherOccupation: z.string().trim().optional(),
  motherContractNo: z.string().trim().optional(),
});

// Local Guardian Schema
const updateLocalGuardianValidationSchema = z.object({
  firstName: z.string().trim().optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

// Student update validation schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female']).optional(),
      email: z.string().email().optional(),
      dateOfBirth: z.string().optional(),
      contractNo: z.string().optional(),
      emergencyContractNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().url().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
