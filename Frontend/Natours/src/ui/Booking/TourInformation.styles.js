import styled from "styled-components";

/* ==========================================
   DESIGN TOKENS
   ========================================== */
export const tokens = {
  colors: {
    bgDark: "#020202",
    bgCard: "#0d0d0d",
    borderCard: "#262626",
    borderLight: "#1f2937",
    primary: "#2183eb",
    primaryHover: "#1a6fc4",
    textHeading: "#7495df",
    textSubheading: "#e2e6ec",
    textLabel: "#d6d7d8",
    textValue: "#5088c5",
    textMuted: "#6b7280",
    textPriceLabel: "#6199e3",
    textPriceTotal: "#abceff",
    bgButton: "#dfe1e3",
    bgChip: "#2183eb",
    error: "#ef4444",
  },
  radii: {
    sm: "0.8rem",
    md: "1.2rem",
    lg: "1.4rem",
    xl: "2rem",
    pill: "999px",
  },
  spacing: {
    xs: "0.6rem",
    sm: "1rem",
    md: "1.6rem",
    lg: "2.4rem",
    xl: "3.2rem",
  },
};

export const Wrapper = styled.div`
  width: min(120rem, 100%);
  margin: 0 auto;
  padding: ${({ $padding }) => $padding || "0"};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "3.2rem"};

  @media (max-width: 768px) {
    gap: 2.4rem;
  }

  @media (max-width: 500px) {
    gap: 1.8rem;
  }
`;

export const Header = styled.div`
  padding-bottom: ${tokens.spacing.lg};
  margin-bottom: ${tokens.spacing.sm};
  border-bottom: 1px solid ${tokens.colors.borderCard};

  @media (max-width: 500px) {
    padding-bottom: ${tokens.spacing.md};
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  font-weight: 700;
  color: ${tokens.colors.textHeading};
  line-height: 1.2;
`;

export const Description = styled.p`
  margin-top: ${tokens.spacing.sm};
  max-width: 75rem;
  font-size: clamp(1.35rem, 1.8vw, 1.55rem);
  line-height: 1.8;
  color: ${tokens.colors.textMuted};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, minmax(0, 1fr));
  gap: ${({ $gap }) => $gap || "2.8rem"};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 500px) {
    gap: 1.6rem;
  }
`;

export const Section = styled.section`
  background: ${({ $bg }) => $bg || tokens.colors.bgDark};
  border: 1px solid ${({ $borderColor }) => $borderColor || tokens.colors.borderCard};
  border-radius: ${tokens.radii.xl};
  padding: ${({ $compact }) => ($compact ? "2rem" : "3rem")};
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 12px 30px rgba(15, 23, 42, 0.06);

  @media (max-width: 768px) {
    padding: 2.2rem;
    border-radius: ${tokens.radii.lg};
  }

  @media (max-width: 500px) {
    padding: 1.6rem;
    border-radius: ${tokens.radii.md};
  }
`;

export const SectionTitle = styled.h2`
  margin-bottom: ${({ $marginBottom }) => $marginBottom || "2.8rem"};
  font-size: clamp(1.7rem, 2.5vw, 2rem);
  font-weight: 700;
  color: ${tokens.colors.textSubheading};

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 500px) {
    margin-bottom: 1.5rem;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "1rem"};

  @media (max-width: 500px) {
    gap: 0.6rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || "column"};
  justify-content: ${({ $justify }) => $justify || "flex-start"};
  align-items: ${({ $align }) => $align || "stretch"};
  gap: ${tokens.spacing.xs};
  padding: 1.8rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${tokens.colors.borderCard};
  }

  @media (max-width: 500px) {
    padding: 1.2rem 0;
  }
`;

export const Label = styled.span`
  font-size: clamp(1.1rem, 1.4vw, 1.2rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${tokens.colors.textLabel};
`;

export const Value = styled.div`
  font-size: clamp(1.45rem, 1.8vw, 1.65rem);
  font-weight: 600;
  color: ${tokens.colors.textValue};
  line-height: 1.7;
  word-break: break-word;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
`;

export const Chip = styled.span`
  padding: 0.8rem 1.4rem;
  border-radius: ${tokens.radii.pill};
  background: ${tokens.colors.primary};
  border: 1px solid ${tokens.colors.borderLight};
  font-size: 1.35rem;
  font-weight: 700;
  color: #000000;

  @media (max-width: 500px) {
    padding: 0.6rem 1.1rem;
    font-size: 1.2rem;
  }
`;

export const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 2}, minmax(0, 1fr));
  gap: 1.4rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: 1.2rem 1.4rem;
  background: ${tokens.colors.primary};
  border-radius: ${tokens.radii.md};
  border: 1px solid ${tokens.colors.borderLight};
  font-size: 1.45rem;
  font-weight: 700;
  color: #000000;

  svg {
    color: #ffffff;
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  @media (max-width: 500px) {
    padding: 1rem 1.2rem;
    font-size: 1.3rem;
  }
`;

export const PaymentCard = styled(Section)`
  position: ${({ $sticky }) => ($sticky === false ? "static" : "sticky")};
  top: 12rem;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 0;
  font-size: clamp(1.4rem, 1.8vw, 1.55rem);
  flex-wrap: wrap;
  gap: 0.8rem;

  &:not(:last-child) {
    border-bottom: 1px solid ${tokens.colors.borderCard};
  }

  @media (max-width: 500px) {
    padding: 1.1rem 0;
  }
`;

export const PriceLabel = styled.span`
  color: ${tokens.colors.textPriceLabel};
`;

export const PriceValue = styled.span`
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
`;

export const TotalRow = styled(PriceRow)`
  margin-top: 2rem;
  padding-top: 2.4rem;
  border-bottom: none;

  ${PriceLabel} {
    font-size: clamp(1.45rem, 2vw, 1.6rem);
    font-weight: 600;
    color: ${tokens.colors.textPriceTotal};
  }

  ${PriceValue} {
    font-size: clamp(2rem, 3vw, 2.6rem);
    font-weight: 700;
  }
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 3rem;
  padding: 1.7rem;
  border: none;
  border-radius: ${tokens.radii.lg};
  background: ${tokens.colors.bgButton};
  color: #000000;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  transition:
    background 0.2s,
    box-shadow 0.2s;

  &:hover {
    background: ${tokens.colors.primary};
    box-shadow: 0 10px 24px rgba(17, 24, 39, 0.18);
  }

  @media (max-width: 500px) {
    padding: 1.3rem;
    font-size: 1.45rem;
    margin-top: 2rem;
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.4rem 1.8rem;
  border: 1px solid ${({ $error }) => ($error ? tokens.colors.error : "#d1d5db")};
  border-radius: ${tokens.radii.lg};
  background: #ffffff;
  transition: all 0.25s;

  &:focus-within {
    border-color: ${tokens.colors.primary};
    box-shadow: 0 0 0 4px rgba(33, 131, 235, 0.18);
  }

  svg {
    font-size: 2rem;
    color: ${tokens.colors.primary};
    flex-shrink: 0;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.5rem;
    color: #111111;
    font-family: inherit;
  }

  .react-datepicker__input-container input::placeholder {
    color: #9ca3af;
  }
`;

export const HelperText = styled.p`
  margin-top: 1rem;
  font-size: 1.3rem;
  color: ${tokens.colors.textMuted};
`;

export const ErrorMessage = styled.p`
  margin-top: 0.8rem;
  color: ${tokens.colors.error};
  font-size: 1.3rem;
  font-weight: 500;
`;

export const Radio = styled.input`
  cursor: pointer;
`;