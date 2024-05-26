import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { z } from 'zod';
import studentValidationSchema from './student.validation';

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
  getAllStudents,
};
