import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidation } from './user.validation';

// creating new student data
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    // data validation using zod
    // const zodParseData = UserValidation.userValidationSchema.parse(student);

    const result = await UserServices.createStudentIntoDB(password, student);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
