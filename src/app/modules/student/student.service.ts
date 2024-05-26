import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); //built in static method

  const student = new StudentModel(studentData);
  const result = await student.save(); //built in instance method
  return result;
};

// getting all students from db
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// getting single student from db
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};

// deleting single student from db

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
