import { UserRole } from '@/enums/userRole.enum';
import { UserStatus } from '@/enums/userStatus.enum';
import Category from './Category';

export default interface User {
  id: number;
  login: string;
  name: string;
  password: string;
  role: UserRole;
  categoryId: number | null;
  category?: Category;
  driverLicenseId: number | null;
  trainerId: number | null;
  phone: string;
  birthdate:	Date;
  firebaseToken: string[] | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
