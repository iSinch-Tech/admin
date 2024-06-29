import { UserRole } from '@/enums/userRole.enum';
import Category from './Category';

export default interface CurrentUser {
  id: number;
  login: string;
  name: string;
  role: UserRole;
  categoryId: number;
  category: Category;
  firebaseToken: string;
}
