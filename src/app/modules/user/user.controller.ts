import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidation } from './user.validation';

// creating new student data
const createStudent = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const userControllers = {
  createStudent,
};
