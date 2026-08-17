import styled, { css } from "styled-components";

export const Page = styled.div`
  width: min(95rem, 100%);
  margin: 0 auto;
  padding: 4rem 0 6rem;

  @media (max-width: 768px) {
    padding: 2rem 0 4rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 500px) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.4rem, 4vw, 3.4rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.8rem;
`;

export const Subtitle = styled.p`
  font-size: clamp(1.35rem, 1.8vw, 1.6rem);
  color: #9e9e9e;
  line-height: 1.6;
`;

/* ==========================================
   DESKTOP TABS ARCHITECTURE
   ========================================== */

export const DesktopTabsWrapper = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const DesktopContentWrapper = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 3rem;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 1.3rem 2rem;
  border-radius: 1.2rem;
  font-size: 1.5rem;
  font-weight: 600;
  transition: all 0.25s;
  background: #171717;
  color: #bdbdbd;

  &:hover {
    background: #232323;
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      background: #2563eb;
      color: white;
    `}

  ${(props) =>
    props.danger &&
    !props.active &&
    css`
      &:hover {
        background: #991b1b;
        color: white;
      }
    `}

  ${(props) =>
    props.danger &&
    props.active &&
    css`
      background: #dc2626;
      color: white;
    `}
`;

export const Content = styled.div`
  background: transparent;
  border: 1px solid #252525;
  border-radius: 2rem;
  padding: 3rem;
  min-height: 55rem;
  color: white;
`;

/* ==========================================
   TABLET & MOBILE COLLAPSIBLE ACCORDION ARCHITECTURE
   ========================================== */

export const AccordionContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 1.6rem;

  @media (max-width: 1023px) {
    display: flex;
  }
`;

export const AccordionItem = styled.div`
  border: 1px solid
    ${({ $isOpen, $danger }) =>
      $isOpen ? ($danger ? "#dc2626" : "#2563eb") : "#252525"};
  border-radius: 1.6rem;
  background: #0d0d0d;
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2rem;
  background: ${({ $isOpen, $danger }) =>
    $isOpen ? ($danger ? "#450a0a" : "#172554") : "#141414"};
  color: ${({ $isOpen }) => ($isOpen ? "#ffffff" : "#d1d5db")};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  transition: all 0.25s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#991b1b" : "#1f2937")};
    color: #ffffff;
  }

  svg.chevron {
    font-size: 2rem;
    transition: transform 0.3s ease;
    transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  }

  @media (max-width: 500px) {
    padding: 1.3rem 1.5rem;
    font-size: 1.45rem;
  }
`;

export const AccordionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 1.9rem;
    flex-shrink: 0;
  }
`;

export const AccordionBody = styled.div`
  padding: 2rem;
  background: transparent;

  @media (max-width: 500px) {
    padding: 1.2rem 1rem;
  }
`;
