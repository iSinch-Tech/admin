import { drivingMockResponse, mockEmptyDriving } from '@/api/drivingMockResponse';
import { UserRole } from '@/enums/userRole.enum';
import { DrivingLesson } from '@/models/DrivingLesson';
import Filter from '@/models/Filter';

export const generateDriving = (date: string): Promise<DrivingLesson[]> => {
  // const params = { ...buildFilter({ date }) };
  // return api.post<unknown, DrivingLesson[]>(`/driving`, { params });
  return new Promise((res) =>
    setTimeout(() => {
      return res(mockEmptyDriving);
    }, 1000),
  );
};
export const getDriving = (filter: Filter): Promise<DrivingLesson[] | undefined> => {
  // const params = { ...buildFilter(filter) };
  // return api.get<unknown, DrivingLesson[]>(`/driving`, { params });
  return new Promise((res) =>
    setTimeout(() => {
      return res(drivingMockResponse);
    }, 1000),
  );
};

export const setLesson = ({ id, status, user, comment }: DrivingLesson) => {
  // return api.post<unknown, DrivingLesson>(`/driving/${id}`, { id, status, user, comment, userId: user?.id });
  return new Promise((res) =>
    setTimeout(() => {
      const lesson = drivingMockResponse.find((lesson) => lesson.id === id);
      if (lesson) {
        lesson.status = status;
        lesson.user = user;
        lesson.userId = user?.id;
        lesson.comment = comment;
      }

      return res(drivingMockResponse.find((lesson) => lesson.id === id));
    }, 1000),
  );
};

export const mockTrainers = [
  {
    id: 2,
    login: 'tr',
    name: 'Инструктор Петя',
    password: 'tr',
    role: UserRole.ADMIN,
    categoryId: 1,
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU',
    phone: '+79999999999',
  },
  {
    id: 3,
    login: 'tr2',
    name: 'Инструктор Сергей',
    password: 'tr2',
    role: UserRole.ADMIN,
    categoryId: 1,
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInBob25lIjoiMSIsInN0YXR1cyI6IkFDVElWRSIsImNhdGVnb3J5SWQiOm51bGwsImJpcnRoZGF0ZSI6IjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMDFUMTY6MjM6NTQuOTkxWiIsImRyaXZlckxpY2Vuc2VJZCI6bnVsbCwiY2F0ZWdvcnkiOm51bGwsImlhdCI6MTcxNDgwNDE5Nn0.RIUVkhGKv9btzRz9ubwg5AJT5-Mming3jfNeXDIz4tU',
    phone: '+79999999999',
  },
];
