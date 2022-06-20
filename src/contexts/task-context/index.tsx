import { createContext, ReactNode } from "react";
import useStateStorage from "../../hooks/use-state-storage";
import { Task } from "../../types/task";

export type TaskContextProps = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  deleteCardTasks: (cardId: string) => void;
};

export type TaskContextProviderProps = {
  children: ReactNode;
};

export const TaskContext = createContext<TaskContextProps>(
  {} as TaskContextProps
);

export const TaskContextProvider: React.FC<TaskContextProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = useStateStorage<Task[]>([], "@tasks");

  function handleDeleteCardTasks(cardId: string) {
    const tasksUpdated = tasks.filter((task) => task.cardId !== cardId);

    setTasks(tasksUpdated);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        deleteCardTasks: handleDeleteCardTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
