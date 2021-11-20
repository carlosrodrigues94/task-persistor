import React, { useContext } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaPowerOff } from "react-icons/fa";
import { CardContext } from "../../contexts/card-context";
import { TaskContext } from "../../contexts/task-context";
import { colors } from "../../styles/colors";

import {
  Container,
  CardHeader,
  ProgressContent,
  DivContentAddNewTask,
} from "./styles";

interface CardProps {
  currentColor: string;
  onClickColor: (color: string) => void;
  progress: number;
  title: string;
  onClickAddNewTask: () => void;
  cardId: string;
}

const Card: React.FC<CardProps> = ({
  children,
  currentColor,
  onClickColor,
  progress,
  title,
  onClickAddNewTask,
  cardId,
}) => {
  const { tasks, deleteCardTasks } = useContext(TaskContext);
  const { deleteCard } = useContext(CardContext);

  function handleDeleteCard() {
    deleteCard(cardId);
    deleteCardTasks(cardId);
  }

  return (
    <Container currentColor={currentColor}>
      <CardHeader>
        {Object.keys(colors).map((key) => (
          <button
            type="button"
            onClick={() => onClickColor(colors[key])}
            style={{ backgroundColor: colors[key] }}
          />
        ))}
        <button className="button-delete-card" onClick={handleDeleteCard}>
          <FaPowerOff />
        </button>
      </CardHeader>
      <ProgressContent>
        <CircularProgressbar
          className="progress"
          styles={buildStyles({
            pathColor: currentColor,
            textColor: currentColor,
          })}
          value={progress}
          text={`${progress ? progress.toFixed(0) : 0}%`}
        />
      </ProgressContent>

      <div className="card-title">
        <h4>{title}</h4>
      </div>

      {!tasks.filter((task) => task.cardId === cardId).length && (
        <DivContentAddNewTask currentColor={currentColor}>
          <button type="button" onClick={onClickAddNewTask}>
            Adicionar nova Tarefa
          </button>
        </DivContentAddNewTask>
      )}

      {children}
    </Container>
  );
};

export { Card };
