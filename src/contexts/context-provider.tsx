import { TaskContextProvider } from "./task-context";
import { CardContextProvider } from "./card-context";

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <>
      <CardContextProvider>
        <TaskContextProvider>{children}</TaskContextProvider>
      </CardContextProvider>
    </>
  );
};
