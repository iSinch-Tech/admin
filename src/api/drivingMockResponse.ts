
import { LessonStatus } from '@/enums/LessonStatus.enum';
import { DrivingLesson } from '@/models/DrivingLesson';

export const mockEmptyDriving: DrivingLesson[] = [
  {
    id: 1,
    date: new Date(2024, 6, 1),
    trainerId: 2,
    status: LessonStatus.OPEN,
  },
];

export const drivingMockResponse: DrivingLesson[] = [
  //   {
  //     id: 1,
  //     date: new Date(2024, 5, 1),
  //     trainerId: 2,
  //     status: 'OPEN',
  //   },
  //   {
  //     id: 1,
  //     date: new Date('06.05.2024 19:00'),
  //     userId: 1,
  //     trainerId: 2,
  //     user: {
  //       id: 1,
  //       login: 'admin',
  //       name: 'Вася',
  //       password: 'admin',
  //       role: UserRole.ADMIN,
  //       categoryId: 1,
  //       access_token:
  //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU',
  // phone: '+79999999999', }, trainer: { id: 2, login: 'tr', name: 'Инструктор Петя', password: 'tr', role:
  // UserRole.ADMIN, categoryId: 1, access_token:
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU',
  // phone: '+79999999999', }, status: 'OPEN', }, { id: 2, date: new Date('06.08.2024 15:00'), userId: 1, trainerId: 2,
  // user: { id: 1, login: 'admin', name: 'Маша', password: 'admin', role: UserRole.ADMIN, categoryId: 1, access_token:
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU',
  // phone: '+79999999999', }, trainer: { id: 3, login: 'tr2', name: 'Инструктор Сергей', password: 'tr2', role:
  // UserRole.ADMIN, categoryId: 1, access_token:
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU',
  // phone: '+79999999999', }, status: 'OPEN', }, { id: 4, date: new Date('06.05.2024 17:00'), userId: 1, trainerId: 2, user: { id: 1, login: 'admin', name: 'Даша', password: 'admin', role: UserRole.ADMIN, categoryId: 1, access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU', phone: '+79999999999', }, trainer: { id: 2, login: 'tr', name: 'Инструктор Петя', password: 'tr', role: UserRole.ADMIN, categoryId: 1, access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU', phone: '+79999999999', }, status: 'OPEN', },
];
