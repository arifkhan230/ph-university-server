import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// will call controller function
// router.post('/create-student', StudentController.);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
