import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentValidationSchema from './student.validation';

// creating new student data
const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Joi

    const student = req.body.student;

    const { error, value } = studentValidationSchema.validate(student);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }

    // console.log(error, value);

    const result = await StudentServices.createStudentIntoDB(student);

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

// getting all student data from database

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
};
