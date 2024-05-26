import { Schema, model, connect, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContractNo: string;
  motherName: string;
  motherOccupation: string;
  motherContractNo: string;
};

export type LocalGuardian = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: UserName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contractNo: string;
  emergencyContractNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isDeleted: boolean;
};
