import React, { ChangeEvent } from "react";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { FiCalendar, FiMinus, FiPlus } from "react-icons/fi";
import { ITask } from "@/types/task";
import { formatCurrency } from "@/utils";
import {
  formatDueDate,
  getDueDateTemperature,
} from "@/utils/format-date";

import {
  Container,
  LabelInputCheckBox,
  DivContentButtons,
  TaskDetails,
  TaskMeta,
  TaskTitle,
  DueDateBadge,
} from "./styles";

type TaskInputCheckboxProps = {
  task: ITask;
  onCheckInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickDeleteTask: (taskId: string) => void;
  onClickAddTask: (data: { taskPosition: number; cardId: string }) => void;
  currentColor: string;
  isDetailed?: boolean;
};

const TaskInputCheckbox: React.FC<TaskInputCheckboxProps> = ({
  task,
  onCheckInput,
  onClickDeleteTask,
  onClickAddTask,
  currentColor,
  isDetailed = false,
}) => {
  const amountLabel =
    task.isCalculator && task.amount
      ? formatCurrency(String(task.amount / 100))
      : null;

  const dueDateValue = task.dueDate ?? task.createdAt;
  const dueDateLabel = formatDueDate(dueDateValue);
  const dueDateTemperature = getDueDateTemperature(
    task.isCompleted ? undefined : dueDateValue
  );

  return (
    <Container isDetailed={isDetailed}>
      <LabelInputCheckBox
        currentColor={currentColor}
        htmlFor={task.id}
        isDetailed={isDetailed}
        isCompleted={task.isCompleted}
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

        {isDetailed ? (
          <TaskDetails>
            <TaskTitle isCompleted={task.isCompleted}>
              {task.description}
            </TaskTitle>
            <TaskMeta>
              <DueDateBadge
                color={dueDateTemperature.color}
                background={dueDateTemperature.background}
                isCompleted={task.isCompleted}
              >
                <FiCalendar />
                {dueDateLabel}
              </DueDateBadge>
              {amountLabel && <span className="amount">{amountLabel}</span>}
              <span className="status">
                {task.isCompleted ? "Concluído" : "Pendente"}
              </span>
            </TaskMeta>
          </TaskDetails>
        ) : (
          <>
            <span>
              {task.isCalculator && amountLabel
                ? `${task.description} ${amountLabel}`
                : task.description}
            </span>
            <DueDateBadge
              color={dueDateTemperature.color}
              background={dueDateTemperature.background}
              isCompleted={task.isCompleted}
              isCompact
            >
              <FiCalendar />
              {dueDateLabel}
            </DueDateBadge>
          </>
        )}
      </LabelInputCheckBox>
      <DivContentButtons currentColor={currentColor} isDetailed={isDetailed}>
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
