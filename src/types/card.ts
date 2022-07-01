import { ITask } from "./task";

export type ICard = {
  id: string;
  color: string;
  title: string;
  isCalculator: boolean;
  tasks: ITask[];
  createdAt: Date;
};
