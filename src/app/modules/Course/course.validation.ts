import { z } from 'zod';

const createPreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(createPreRequisiteCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = createCourseValidationSchema.partial();

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
