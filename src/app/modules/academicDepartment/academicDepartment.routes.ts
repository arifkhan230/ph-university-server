import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartmentFromDB);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartmentFromDB,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
