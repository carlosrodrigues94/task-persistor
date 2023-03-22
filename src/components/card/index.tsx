import React, { ReactNode, useMemo } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Switch from "react-switch";
import { FaPowerOff, FaWallet } from "react-icons/fa";
import { FiArrowDown, FiMinus } from "react-icons/fi";

import {
  useCardsDelete,
  useCardsDownload,
  useCardsList,
  useCardsUpdate,
} from "@/hooks/cards";

import { ITask } from "@/types/task";
import { ColorKey, colors } from "@/styles/colors";
import {
  calculateProgressDecremental,
  calculateProgressIncremental,
} from "@/utils/currency";

import {
  Container,
  CardHeader,
  ProgressContent,
  DivContentAddNewTask,
  SwitchAndButtonContent,
} from "./styles";
import { lighten } from "polished";
import { Incomes } from "../incomes";
import { useIncomesList } from "@/hooks/incomes";

interface CardProps {
  currentColor: string;
  onClickColor: (color: string) => void;
  progress: number;
  title: string;
  onClickAddNewTask: () => void;
  onClickAddNewIncome: () => void;
  cardId: string;
  isCalculator: boolean;
  children: ReactNode;
  progressCalculatorIncremental: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  currentColor,
  onClickColor,
  progress: tasksProgress = 0,
  title,
  onClickAddNewTask,
  onClickAddNewIncome,
  cardId,
  isCalculator,
  progressCalculatorIncremental = true,
}) => {
  const { handleDeleteCard } = useCardsDelete();
  const { cards } = useCardsList();
  const { incomes } = useIncomesList();
  const { handleDownloadCardData } = useCardsDownload();
  const { handleToggleProgressCalculatorType, handleHideOrRecoverCard } =
    useCardsUpdate();

  const progress: number = useMemo(() => {
    if (isCalculator || progressCalculatorIncremental) {
      return tasksProgress;
    }

    const result = 100 - tasksProgress;
    return result;
  }, [tasksProgress, progressCalculatorIncremental, isCalculator]);

  const tasks: ITask[] = useMemo(() => {
    const card = cards.find((card) => card.id === cardId);

    if (!card) return [];

    return card.tasks;
  }, [cards, cardId]);

  const getProgressValue = () => {
    if (!isCalculator) {
      // Progress starts on 100%
      if (!progressCalculatorIncremental) {
        return `${progress ? (100 - progress).toFixed(0) : 100}%`;
      }

      return `${progress ? progress.toFixed(0) : 0}%`;
    }

    const filtered = tasks
      .filter((task) => task.cardId === cardId)
      .filter((task) => task.isCompleted);

    const hasNotAmount = filtered.some((task) => task.amount === undefined);

    if (hasNotAmount) {
      return `${progress ? progress.toFixed(0) : 0}%`;
    }

    if (progressCalculatorIncremental) {
      return calculateProgressIncremental(tasks, cardId);
    }

    return calculateProgressDecremental(filtered);
  };

  const progressValue = getProgressValue();

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
      <button
        className="button-minimize-card"
        onClick={() => handleHideOrRecoverCard({ hide: true, cardId })}
      >
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
        <>
          <CircularProgressbar
            className="progress"
            styles={buildStyles({
              pathColor: currentColor,
              textColor: currentColor,
              textSize: isCalculator ? 14 : 18,
            })}
            value={progress}
            text={progressValue}
          />
          {isCalculator && !!incomes.find((item) => item.cardId === cardId) && (
            <Incomes cardId={cardId} currentColor={currentColor} />
          )}
        </>
      </ProgressContent>
      <SwitchAndButtonContent currentColor={currentColor}>
        {isCalculator && (
          <button
            type="button"
            id="button-add-salary"
            onClick={onClickAddNewIncome}
          >
            Add Income <FaWallet />
          </button>
        )}
        <Switch
          className="switch"
          checked={progressCalculatorIncremental}
          onChange={() => {
            handleToggleProgressCalculatorType({
              cardId: cardId,
            });
          }}
          height={18}
          handleDiameter={22}
          onHandleColor={currentColor}
          offHandleColor={currentColor}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={lighten(0.3, currentColor)}
          offColor={"#dcdde1"}
          width={42}
        />
      </SwitchAndButtonContent>
      <div className="card-title">
        <h4>{title}</h4>
      </div>

      {!tasks.filter((task) => task.cardId === cardId).length && (
        <DivContentAddNewTask currentColor={currentColor}>
          <button type="button" onClick={onClickAddNewTask}>
            Add new task
          </button>
        </DivContentAddNewTask>
      )}

      {children}
    </Container>
  );
};

export { Card };
