import { UserRole } from '@/enums/userRole.enum';
import Category from './Category';

export default interface User {
  id?: number;
  login: string;
  name: string;
  password: string;
  role: UserRole;
  categoryId: number;
  access_token: string;
  phone: string;
  category?: Category;
}
