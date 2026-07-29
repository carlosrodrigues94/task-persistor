import React, { FC } from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import { CardFilter, CardSortOrder } from "@/types/dashboard-preferences";
import { Container } from "./styles";

interface CardSortControlsProps {
  sortOrder: CardSortOrder;
  filter: CardFilter;
  onToggleSort: () => void;
  onChangeFilter: (filter: CardFilter) => void;
}

export const CardSortControls: FC<CardSortControlsProps> = ({
  sortOrder,
  filter,
  onToggleSort,
  onChangeFilter,
}) => {
  return (
    <Container>
      <button type="button" onClick={onToggleSort} aria-label="Toggle card sort order">
        {sortOrder === "asc" ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        <span>{sortOrder === "asc" ? "Oldest first" : "Newest first"}</span>
      </button>

      <label htmlFor="card-filter">
        Filter
        <select
          id="card-filter"
          value={filter}
          onChange={(event) => onChangeFilter(event.target.value as CardFilter)}
        >
          <option value="all">All cards</option>
          <option value="calculator">Calculator</option>
          <option value="regular">Regular</option>
        </select>
      </label>
    </Container>
  );
};
