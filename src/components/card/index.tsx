import React, { useContext } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaPowerOff } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { CardContext } from "../../contexts/card-context";
import { TaskContext } from "../../contexts/task-context";
import { colors } from "../../styles/colors";
import { formatCurrency } from "../../utils";

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
  isCalculator: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  currentColor,
  onClickColor,
  progress,
  title,
  onClickAddNewTask,
  cardId,
  isCalculator,
}) => {
  const { tasks, deleteCardTasks } = useContext(TaskContext);
  const { deleteCard } = useContext(CardContext);

  function handleDeleteCard() {
    deleteCard(cardId);
    deleteCardTasks(cardId);
  }

  const getProgressValue = () => {
    console.log("é calc", isCalculator);
    if (!isCalculator) {
      return `${progress ? progress.toFixed(0) : 0}%`;
    }

    const filtered = tasks
      .filter((task) => task.cardId === cardId)
      .filter((task) => task.isCompleted);

    const hasNotAmount = filtered.some((task) => task.amount === undefined);

    if (hasNotAmount) {
      return `${progress ? progress.toFixed(0) : 0}%`;
    }

    const { amount } = filtered.reduce(
      (prev, curr) => {
        const value = prev.amount + curr.amount;

        return { ...prev, amount: value };
      },
      { amount: 0 }
    );

    console.log("TOTAL: ", amount);

    return `${formatCurrency(String(amount / 100))}`;
  };

  return (
    <Container currentColor={currentColor}>
      <button className="button-minimize-card" onClick={handleDeleteCard}>
        <FiMinus />
      </button>
      <button className="button-delete-card" onClick={handleDeleteCard}>
        <FaPowerOff />
      </button>
      <CardHeader>
        {Object.keys(colors).map((key) => (
          <button
            type="button"
            onClick={() => onClickColor(colors[key])}
            style={{ backgroundColor: colors[key] }}
          />
        ))}
      </CardHeader>
      <ProgressContent>
        <CircularProgressbar
          className="progress"
          styles={buildStyles({
            pathColor: currentColor,
            textColor: currentColor,
            textSize: isCalculator ? 14 : 18,
          })}
          value={progress}
          text={getProgressValue()}
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
