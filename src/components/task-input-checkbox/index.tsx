import React, { ChangeEvent } from "react";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Task } from "../../types/task";

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
        <span>{task.description}</span>
      </LabelInputCheckBox>
      <DivContentButtons>
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
