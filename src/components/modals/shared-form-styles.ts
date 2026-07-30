import styled from "styled-components";
import { colors } from "@/styles/colors";
import { theme } from "@/styles/theme";

/** Shared form layout used inside SimpleModal children */
export const ModalFormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 14px;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
    width: 100%;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: ${theme.colors.boldTextColor};
  }

  input,
  select,
  textarea {
    width: 100%;
    min-height: 42px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.borderColor};
    background: #fafbfc;
    padding: 0 12px;
    color: ${theme.colors.titleBoldTextColor};
    font-size: 14px;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: rgba(0, 0, 0, 0.35);
    }

    &:hover {
      border-color: rgba(0, 0, 0, 0.18);
    }

    &:focus {
      background: #fff;
      border-color: ${colors.green};
      box-shadow: 0 0 0 3px rgba(29, 209, 161, 0.18);
    }
  }

  input[type="date"] {
    color-scheme: light;
  }
`;
