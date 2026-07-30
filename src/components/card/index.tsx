import React, { ReactNode, useMemo, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Switch from "react-switch";
import {
  FaPowerOff,
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaWallet,
} from "react-icons/fa";
import { FiArrowDown, FiMaximize2, FiMinimize2, FiMinus } from "react-icons/fi";
import useOnClickOutside from "use-onclickoutside";

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
  ColorDropdown,
  ColorPickerWrapper,
  ProgressContent,
  DivContentAddNewTask,
  SwitchAndButtonContent,
  TasksList,
} from "./styles";
import { Incomes } from "../incomes";
import { useIncomesList } from "@/hooks/incomes";
import { formatCreatedAt } from "@/utils/format-date";
import { getSwitchColors } from "@/utils/switch-colors";

interface CardProps {
  createdAt: Date | string;
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
  onClickButtonSort: () => void;
  sortType: "desc" | "asc";
}

const Card: React.FC<CardProps> = ({
  children,
  createdAt,
  currentColor,
  onClickColor,
  progress: tasksProgress = 0,
  title,
  onClickAddNewTask,
  onClickAddNewIncome,
  cardId,
  isCalculator,
  progressCalculatorIncremental = true,
  onClickButtonSort,
  sortType,
}) => {
  const { handleDeleteCard } = useCardsDelete();
  const { cards } = useCardsList();
  const { incomes } = useIncomesList();
  const { handleDownloadCardData } = useCardsDownload();
  const { handleToggleProgressCalculatorType, handleHideOrRecoverCard } =
    useCardsUpdate();

  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const colorDropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(colorDropdownRef, () => setIsColorDropdownOpen(false));

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
  const switchColors = useMemo(
    () => getSwitchColors(currentColor),
    [currentColor]
  );

  const detailedChildren = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child as React.ReactElement<{ isDetailed?: boolean }>, {
          isDetailed: isMaximized,
        });
      }),
    [children, isMaximized]
  );

  return (
    <Container currentColor={currentColor} isMaximized={isMaximized}>
      <time className="card-created-at" dateTime={String(createdAt)}>
        {formatCreatedAt(createdAt)}
      </time>
      <a href="/" id="a-download-json">
        json
      </a>
      <button
        type="button"
        className="button-maximize-card"
        aria-label={isMaximized ? "Minimize card" : "Maximize card"}
        aria-pressed={isMaximized}
        onClick={() => setIsMaximized((open) => !open)}
      >
        {isMaximized ? <FiMinimize2 /> : <FiMaximize2 />}
      </button>
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
      <ColorPickerWrapper ref={colorDropdownRef}>
        <button
          type="button"
          className="button-color-card"
          aria-label="Change card color"
          aria-expanded={isColorDropdownOpen}
          onClick={() => setIsColorDropdownOpen((open) => !open)}
        >
          <span style={{ backgroundColor: currentColor }} />
        </button>
        {isColorDropdownOpen && (
          <ColorDropdown>
            {Object.keys(colors).map((key) => {
              const colorKey = key as ColorKey;
              const color = colors[colorKey];
              const isSelected = color === currentColor;

              return (
                <button
                  key={key}
                  type="button"
                  aria-label={`Set color ${key}`}
                  aria-pressed={isSelected}
                  className={isSelected ? "is-selected" : undefined}
                  onClick={() => {
                    onClickColor(color);
                    setIsColorDropdownOpen(false);
                  }}
                  style={{ backgroundColor: color }}
                />
              );
            })}
          </ColorDropdown>
        )}
      </ColorPickerWrapper>
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
      <div className="card-title">
        <h4>{title}</h4>
      </div>
      <SwitchAndButtonContent currentColor={currentColor}>
        {isCalculator && (
          <>
            <button
              type="button"
              id="button-sort-tasks"
              onClick={onClickButtonSort}
            >
              {sortType === "asc" ? (
                <FaSortAmountDownAlt />
              ) : (
                <FaSortAmountUpAlt />
              )}
            </button>
            <button
              type="button"
              id="button-add-salary"
              onClick={onClickAddNewIncome}
            >
              Add Income <FaWallet />
            </button>
          </>
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
          onHandleColor={switchColors.onHandleColor}
          offHandleColor={switchColors.offHandleColor}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={switchColors.onColor}
          offColor={switchColors.offColor}
          boxShadow={switchColors.boxShadow}
          activeBoxShadow={switchColors.activeBoxShadow}
          width={42}
        />
      </SwitchAndButtonContent>

      {!tasks.filter((task) => task.cardId === cardId).length && (
        <DivContentAddNewTask currentColor={currentColor}>
          <button type="button" onClick={onClickAddNewTask}>
            Add new task
          </button>
        </DivContentAddNewTask>
      )}

      <TasksList isMaximized={isMaximized}>{detailedChildren}</TasksList>
    </Container>
  );
};

export { Card };
