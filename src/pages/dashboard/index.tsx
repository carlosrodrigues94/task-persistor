import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Container } from "./styles";

import { Card } from "@/components/card";

import TaskInputCheckbox from "@/components/task-input-checkbox";
import { ModalAddNewTask } from "@/components/modals/modal-add-new-task";

import { ModalAddNewTaskCalculator } from "@/components/modals/modal-add-new-task-calculator";
import { useCardsUpdate, useCardsList } from "@/hooks/cards";
import { ITask } from "@/types/task";
import { useTasksCreate, useTasksDelete, useTasksUpdate } from "@/hooks/tasks";
import { NoCards } from "@/components/no-cards";
import { useAuth } from "@/hooks/use-auth";
import { logo } from "@/assets";
import { useIncomesCreate } from "@/hooks/incomes";
import { ModalAddNewIncome } from "@/components/modals/modal-add-new-income";
import { FeeCalculator } from "@/components/fee-calculator/fee-calculator";

export const Dashboard: FC = () => {
  const { isAuthenticated } = useAuth();
  const { handleSetCardColor } = useCardsUpdate();
  const { cards, handleRefreshCardsList } = useCardsList();
  const { handleChangeTaskCheck } = useTasksUpdate();
  const { handleDeleteTask } = useTasksDelete();
  const { handleCreateTask } = useTasksCreate();
  const { handleCreateIncome } = useIncomesCreate();

  const [showModalAddNewTask, setShowModalAddNewTask] = useState(false);
  const [showModalAddNewCalcTask, setShowModalAddNewCalcTask] = useState(false);
  const [showModalAddNewIncome, setShowModalAddNewIncome] = useState(false);
  const [newTaskPosition, setNewTaskPosition] = useState(0);
  const [newTaskCardId, setNewTaskCardId] = useState("");
  const [newIncomeCardId, setNewIncomeCardId] = useState("");
  const [tasksSortType, setTasksSortType] = useState<{
    sortType: "asc" | "desc";
    cardId: string;
  }>({ sortType: "desc", cardId: "" });

  function handleClickCheckTask(
    event: ChangeEvent<HTMLInputElement>,
    cardId: string
  ) {
    const { checked, id } = event.target;

    handleChangeTaskCheck({ cardId, isChecked: checked, taskId: id });
  }

  function handleConfirmAddNewTask(value: string) {
    handleCreateTask({
      cardId: newTaskCardId,
      task: {
        amount: 0,
        description: value,
        isCalculator: false,
        isCompleted: false,
        position: newTaskPosition,
      },
    });
    setShowModalAddNewTask(false);
    setNewTaskCardId("");
    setNewTaskPosition(0);
  }

  function handleConfirmAddNewCalcTask(data: {
    value: string;
    description: string;
  }) {
    const value = Number(data.value.replace(/\D/g, ""));

    handleCreateTask({
      cardId: newTaskCardId,
      task: {
        description: data.description,
        isCompleted: false,
        position: newTaskPosition,
        amount: value * 100,
        isCalculator: true,
      },
    });
    setShowModalAddNewCalcTask(false);
    setNewTaskCardId("");
    setNewTaskPosition(0);
  }

  const handleClickAddNewTask = useCallback(
    (data: { taskPosition: number; cardId: string; isCalculator: boolean }) => {
      setNewTaskPosition(data.taskPosition);
      setNewTaskCardId(data.cardId);

      if (data.isCalculator) {
        setShowModalAddNewCalcTask(true);
        return;
      }
      setShowModalAddNewTask(true);
    },
    []
  );

  const handleClickAddNewIncome = useCallback((data: { cardId: string }) => {
    setShowModalAddNewIncome(true);
    setNewIncomeCardId(data.cardId);
  }, []);

  const handleConfirmAddNewIncome = useCallback(
    (data: { amount: string; title: string }) => {
      const amount = Number(data.amount.replace(/\D/g, ""));

      handleCreateIncome({
        title: data.title,
        cardId: newIncomeCardId,
        amount: amount * 100,
      });

      setShowModalAddNewIncome(false);
      setNewIncomeCardId("");
    },
    [handleCreateIncome, newIncomeCardId]
  );

  function getCardProgress(data: { tasks: ITask[] }) {
    const completed = data.tasks.filter((task) => task.isCompleted);

    const progressCalc = (completed.length / data.tasks.length) * 100;
    return parseInt(progressCalc.toFixed(0));
  }

  const handleClickButtonSort = useCallback(
    (cardId: string) => {
      if (tasksSortType.sortType === "asc") {
        setTasksSortType({ cardId, sortType: "desc" });
        return;
      }
      setTasksSortType({ cardId, sortType: "asc" });
    },
    [tasksSortType]
  );

  function sortTasks(a: ITask, b: ITask): number {
    if (tasksSortType.sortType === "asc" && a.amount < b.amount) {
      return -1;
    }

    if (tasksSortType.sortType === "asc" && a.amount > b.amount) {
      return 1;
    }

    if (tasksSortType.sortType === "desc" && a.amount < b.amount) {
      return 1;
    }

    if (tasksSortType.sortType === "desc" && a.amount > b.amount) {
      return -1;
    }

    return 1;
  }

  useEffect(() => {
    handleRefreshCardsList();
  }, [handleRefreshCardsList]);

  return (
    <Container>
      <NoCards />
      {!isAuthenticated && <img id="img-logo" src={logo} alt="logo" />}
      <ModalAddNewTask
        isOpen={showModalAddNewTask}
        onClickConfirm={(value) => handleConfirmAddNewTask(value)}
        onClickCancel={() => {
          setShowModalAddNewTask(false);
        }}
      />

      <ModalAddNewTaskCalculator
        isOpen={showModalAddNewCalcTask}
        onClickConfirm={handleConfirmAddNewCalcTask}
        onClickCancel={() => {
          setShowModalAddNewCalcTask(false);
        }}
      />

      <ModalAddNewIncome
        isOpen={showModalAddNewIncome}
        onClickCancel={() => {
          setShowModalAddNewIncome(false);
          setNewIncomeCardId("");
        }}
        onClickConfirm={(value) => {
          handleConfirmAddNewIncome({
            amount: value.amount,
            title: value.title,
          });
        }}
      />

      {cards
        .filter((card) => !card.isHidden)
        .sort((a, b) => {
          const isLater = new Date(a.createdAt) > new Date(b.createdAt);
          if (isLater) {
            return 1;
          }
          return -1;
        })
        .map((card) => (
          <Card
            key={card.id}
            isCalculator={card.isCalculator}
            cardId={card.id}
            currentColor={card.color}
            onClickColor={(color) =>
              handleSetCardColor({ cardId: card.id, color })
            }
            progress={getCardProgress({ tasks: card.tasks || [] })}
            progressCalculatorIncremental={card.progressCalculatorIncremental}
            onClickAddNewTask={() => {
              handleClickAddNewTask({
                cardId: card.id,
                taskPosition: 1,
                isCalculator: card.isCalculator,
              });
            }}
            onClickAddNewIncome={() => {
              handleClickAddNewIncome({
                cardId: card.id,
              });
            }}
            sortType={tasksSortType.sortType}
            onClickButtonSort={() => handleClickButtonSort(card.id)}
            title={card.title}
          >
            {card.tasks
              .filter((task) => task.cardId === card.id)
              .sort((a, b) => sortTasks(a, b))
              .map((task) => (
                <TaskInputCheckbox
                  task={task}
                  key={task.id}
                  currentColor={card.color}
                  onCheckInput={(event) => handleClickCheckTask(event, card.id)}
                  onClickAddTask={({ cardId, taskPosition }) => {
                    handleClickAddNewTask({
                      taskPosition,
                      cardId,
                      isCalculator: card.isCalculator,
                    });
                  }}
                  onClickDeleteTask={() =>
                    handleDeleteTask({ cardId: card.id, taskId: task.id })
                  }
                />
              ))}
          </Card>
        ))}
    </Container>
  );
};
