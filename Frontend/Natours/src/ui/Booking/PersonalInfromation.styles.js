import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";

/* ==========================================
   DESIGN TOKENS
   ========================================== */
export const tokens = {
  colors: {
    bgDark: "#020202",
    bgInput: "#111111",
    bgButtonSec: "#2b2b2b",
    borderInput: "#3d4755",
    borderCard: "#e9e2e2",
    primary: "#2183eb",
    primaryHover: "#1a6fc4",
    textHeading: "#e2e6ec",
    textLabel: "#d6d7d8",
    textMuted: "#9ca3af",
    error: "#ef4444",
  },
  radii: {
    sm: "0.8rem",
    md: "1.4rem",
    lg: "2rem",
    pill: "999px",
  },
  spacing: {
    xs: "0.6rem",
    sm: "1rem",
    md: "1.6rem",
    lg: "2rem",
    xl: "3rem",
  },
};

export const Container = styled.div`
  width: min(120rem, 100%);
  margin: 0 auto;
  padding: ${({ $padding }) => $padding || "0"};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "3rem"};

  @media (max-width: 768px) {
    gap: 2.2rem;
  }

  @media (max-width: 500px) {
    gap: 1.6rem;
  }
`;

export const Section = styled.section`
  background: ${({ $bg }) => $bg || tokens.colors.bgDark};
  border: 1px solid ${({ $borderColor }) => $borderColor || tokens.colors.borderCard};
  border-radius: ${tokens.radii.lg};
  padding: ${({ $compact }) => ($compact ? "2rem" : "3rem")};
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 12px 30px rgba(15, 23, 42, 0.06);

  @media (max-width: 768px) {
    padding: 2.2rem;
    border-radius: 1.6rem;
  }

  @media (max-width: 500px) {
    padding: 1.5rem;
    border-radius: 1.2rem;
  }
`;

export const SectionTitle = styled.h2`
  margin-bottom: ${({ $marginBottom }) => $marginBottom || "2.5rem"};
  font-size: clamp(1.7rem, 2.5vw, 2rem);
  font-weight: 700;
  color: ${tokens.colors.textHeading};

  @media (max-width: 768px) {
    margin-bottom: 1.8rem;
  }

  @media (max-width: 500px) {
    margin-bottom: 1.4rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, minmax(0, 1fr));
  gap: ${({ $gap }) => $gap || "2rem"};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }

  @media (max-width: 500px) {
    gap: 1.2rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "0"};
`;

export const Label = styled.label`
  margin-bottom: 0.8rem;
  font-size: clamp(1.15rem, 1.4vw, 1.3rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${tokens.colors.textLabel};
`;

const InputStyles = css`
  width: 100%;
  height: 5.2rem;
  padding: 0 1.6rem;
  border: 1px solid ${({ $error }) => ($error ? tokens.colors.error : tokens.colors.borderInput)};
  border-radius: ${tokens.radii.md};
  background: ${tokens.colors.bgInput};
  color: #ffffff;
  font-size: clamp(1.35rem, 1.8vw, 1.5rem);
  font-family: inherit;
  transition: all 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${tokens.colors.primary};
    box-shadow: 0 0 0 4px rgba(33, 131, 235, 0.18);
  }

  &::placeholder {
    color: ${tokens.colors.textMuted};
  }

  @media (max-width: 500px) {
    height: 4.6rem;
    padding: 0 1.2rem;
  }
`;

export const Input = styled.input`
  ${InputStyles}

  &[type="file"] {
    padding: 0.9rem 1.2rem;
    cursor: pointer;

    @media (max-width: 500px) {
      padding: 0.6rem 0.8rem;
    }
  }

  &::file-selector-button {
    border: none;
    background: ${tokens.colors.primary};
    color: white;
    padding: 0.7rem 1.3rem;
    border-radius: ${tokens.radii.sm};
    cursor: pointer;
    margin-right: 1rem;
    font-weight: 600;

    @media (max-width: 500px) {
      padding: 0.5rem 0.9rem;
      font-size: 1.2rem;
    }
  }
`;

export const SelectOp = styled.select`
  ${InputStyles}
  cursor: pointer;
`;

export const StyledDatePicker = styled(DatePicker)`
  ${InputStyles}
`;

export const Error = styled.span`
  margin-top: 0.8rem;
  color: ${tokens.colors.error};
  font-size: 1.25rem;
  font-weight: 500;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;

  @media (max-width: 500px) {
    justify-content: stretch;
    button {
      width: 100%;
    }
  }
`;

export const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 1.2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.4rem;

    button {
      width: 100%;
    }
  }
`;

const ButtonStyles = css`
  padding: 1.5rem 2.8rem;
  border: none;
  border-radius: ${tokens.radii.md};
  font-size: clamp(1.4rem, 1.8vw, 1.55rem);
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  transition: all 0.25s ease;

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 500px) {
    padding: 1.2rem 2rem;
    width: 100%;
  }
`;

export const PrimaryButton = styled.button`
  ${ButtonStyles}
  background: white;
  color: black;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:hover {
    background: ${tokens.colors.primary};
    color: white;
  }
`;

export const SecondaryButton = styled.button`
  ${ButtonStyles}
  background: ${tokens.colors.bgButtonSec};
  color: white;
  border: 1px solid ${tokens.colors.borderInput};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:hover {
    background: #3a3a3a;
  }
`;
