import { LessonStatus } from '@/enums/LessonStatus.enum';
import User from './User';

export type DrivingLesson = {
  id: number;
  date: Date;
  userId?: number;
  trainerId?: number;
  user?: User;
  trainer?: User;
  status: LessonStatus;
  comment?: string;
};
