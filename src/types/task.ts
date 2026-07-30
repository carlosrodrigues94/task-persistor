export type ITask = {
  description: string;
  id: string;
  isCompleted: boolean;
  position: number;
  cardId: string;
  amount: number;
  isCalculator: boolean;
  createdAt?: string | Date;
  dueDate?: string;
};
