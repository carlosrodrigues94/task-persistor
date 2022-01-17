import React, { ChangeEvent, useCallback, useContext, useState } from "react";

import { v4 as uuid } from "uuid";

import { Container } from "./styles";

import { Card } from "../../components/card";

import TaskInputCheckbox from "../../components/task-input-checkbox";
import { ModalAddNewTask } from "../../components/modals/modal-add-new-task";

import "react-circular-progressbar/dist/styles.css";
import { TaskContext } from "../../contexts/task-context";
import { CardContext, SetCardColorProps } from "../../contexts/card-context";
import { ModalAddNewTaskCalculator } from "../../components/modals/modal-add-new-task-calculator";

export const Home: React.FC = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const { cards, setCardColor } = useContext(CardContext);

  const [showModalAddNewTask, setShowModalAddNewTask] = useState(false);
  const [showModalAddNewCalcTask, setShowModalAddNewCalcTask] = useState(false);
  const [newTaskPosition, setNewTaskPosition] = useState(0);
  const [newTaskCardId, setNewTaskCardId] = useState("");

  function handleClickCheckTask(event: ChangeEvent<HTMLInputElement>) {
    const { checked, id } = event.target;

    const tasksFiltered = tasks.filter((task) => task.id !== id);
    const taskChecked = tasks.find((task) => task.id === id);
    if (!taskChecked) return [...tasksFiltered];
    setTasks([...tasksFiltered, { ...taskChecked, isCompleted: checked }]);
  }

  function handleChangeCardColor(data: SetCardColorProps) {
    setCardColor(data);
  }

  function handleClickDeleteTask(taskId: string) {
    const filtered = tasks.filter((task) => task.id !== taskId);
    setTasks(filtered);
  }

  function handleConfirmAddNewTask(value: string) {
    setTasks([
      ...tasks,
      {
        description: value,
        id: uuid(),
        isCompleted: false,
        position: newTaskPosition,
        cardId: newTaskCardId,
        amount: 0,
        isCalculator: false,
      },
    ]);
    setShowModalAddNewTask(false);
    setNewTaskCardId("");
    setNewTaskPosition(0);
  }

  function handleConfirmAddNewCalcTask(data: {
    value: string;
    description: string;
  }) {
    const value = Number(data.value.replace(/\D/g, ""));

    setTasks([
      ...tasks,
      {
        description: data.description,
        id: uuid(),
        isCompleted: false,
        position: newTaskPosition,
        cardId: newTaskCardId,
        amount: value * 100,
        isCalculator: true,
      },
    ]);
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

  function getCardProgress(data: { cardId: string }) {
    const cardTasks = tasks.filter((task) => task.cardId === data.cardId);
    const completed = cardTasks.filter((task) => task.isCompleted);

    const progressCalc = (completed.length / cardTasks.length) * 100;
    return parseInt(progressCalc.toFixed(0));
  }

  return (
    <Container>
      <ModalAddNewTask
        isOpen={showModalAddNewTask}
        onClickConfirm={handleConfirmAddNewTask}
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

      {cards.map((card) => (
        <Card
          isCalculator={card.isCalculator}
          cardId={card.id}
          currentColor={card.color}
          onClickColor={(color) =>
            handleChangeCardColor({ cardId: card.id, color })
          }
          progress={getCardProgress({ cardId: card.id })}
          onClickAddNewTask={() =>
            handleClickAddNewTask({
              cardId: card.id,
              taskPosition: 1,
              isCalculator: card.isCalculator,
            })
          }
          title={card.title}
        >
          {tasks
            .filter((task) => task.cardId === card.id)
            .sort((a, b) => (a.position < b.position ? -1 : 1))
            .map((task) => (
              <TaskInputCheckbox
                task={task}
                currentColor={card.color}
                onCheckInput={handleClickCheckTask}
                onClickAddTask={({ cardId, taskPosition }) =>
                  handleClickAddNewTask({
                    taskPosition,
                    cardId,
                    isCalculator: card.isCalculator,
                  })
                }
                onClickDeleteTask={handleClickDeleteTask}
              />
            ))}
        </Card>
      ))}
    </Container>
  );
};
