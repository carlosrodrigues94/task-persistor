import React, { ChangeEvent } from "react";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Task } from "../../types/task";
import { formatCurrency } from "../../utils";

import { Container, LabelInputCheckBox, DivContentButtons } from "./styles";

type TaskInputCheckboxProps = {
  task: Task;
  onCheckInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickDeleteTask: (taskId: string) => void;
  onClickAddTask: (data: { taskPosition: number; cardId: string }) => void;
  currentColor: string;
};

const TaskInputCheckbox: React.FC<TaskInputCheckboxProps> = ({
  task,
  onCheckInput,
  onClickDeleteTask,
  onClickAddTask,
  currentColor,
}) => {
  const getTaskDescription = () => {
    const { description, amount, isCalculator } = task;

    if (isCalculator) {
      const value = formatCurrency(String(amount / 100));
      return `${description} ${value}`;
    }

    return `${task.description}`;
  };
  return (
    <Container>
      <LabelInputCheckBox
        currentColor={currentColor}
        htmlFor={task.id}
        key={task.id}
      >
        {task.isCompleted ? (
          <FaCheckSquare color={currentColor} />
        ) : (
          <FaSquare color={currentColor} />
        )}

        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={onCheckInput}
          name="input-task"
          id={task.id}
        />
        <span>{getTaskDescription()}</span>
      </LabelInputCheckBox>
      <DivContentButtons currentColor={currentColor}>
        <button type="button" onClick={() => onClickDeleteTask(task.id)}>
          <FiMinus />
        </button>
        <button
          type="button"
          onClick={() => {
            onClickAddTask({
              taskPosition: task.position + 1,
              cardId: task.cardId,
            });
          }}
        >
          <FiPlus />
        </button>
      </DivContentButtons>
    </Container>
  );
};

export default TaskInputCheckbox;
