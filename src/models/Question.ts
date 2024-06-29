export default interface Question {
  id?: number;
  image: string;
  name: string;
  text: string;
  answers: Record<string, string>[];
  categoryId: number;
}
