import { TaskContextProvider } from "@/contexts/task-context";
import { CardContextProvider } from "@/contexts/card-context";
import { ReactNode } from "react";

export type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  return (
    <>
      <CardContextProvider>
        <TaskContextProvider>{children}</TaskContextProvider>
      </CardContextProvider>
    </>
  );
};
