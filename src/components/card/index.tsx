import { useCardsDelete, useCardsDownload, useCardsList } from "@/hooks/cards";
import { ITask } from "@/types/task";
import React, { ReactNode, useMemo } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaPowerOff } from "react-icons/fa";
import { FiArrowDown, FiMinus } from "react-icons/fi";
import { ColorKey, colors } from "../../styles/colors";
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
  children: ReactNode;
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
  const { handleDeleteCard } = useCardsDelete();
  const { cards } = useCardsList();
  const { handleDownloadCardData } = useCardsDownload();

  const tasks: ITask[] = useMemo(() => {
    const card = cards.find((card) => card.id === cardId);

    if (!card) return [];

    return card.tasks;
  }, [cards, cardId]);

  const getProgressValue = () => {
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

    return `${formatCurrency(String(amount / 100))}`;
  };

  return (
    <Container currentColor={currentColor}>
      <a href="/" id="a-download-json">
        json
      </a>
      <button
        className="button-download-card"
        onClick={() => {
          handleDownloadCardData({ cardId });
        }}
      >
        <FiArrowDown />
      </button>
      <button className="button-minimize-card" onClick={() => {}}>
        <FiMinus />
      </button>
      <button
        className="button-delete-card"
        onClick={() => handleDeleteCard(cardId)}
      >
        <FaPowerOff />
      </button>
      <CardHeader>
        {Object.keys(colors).map((key) => {
          const colorKey = key as ColorKey;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onClickColor(colors[colorKey])}
              style={{ backgroundColor: colors[colorKey] }}
            />
          );
        })}
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
