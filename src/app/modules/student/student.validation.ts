import { z } from 'zod';

const userNameValidationSchema = z.object({
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
const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContractNo: z.string().trim(),
  motherName: z.string().trim(),
  motherOccupation: z.string().trim(),
  motherContractNo: z.string().trim(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  firstName: z.string().trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female']),
      email: z.string().email(),
      dateOfBirth: z.date().optional(),
      contractNo: z.string(),
      emergencyContractNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().url().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
