import styled, { css } from "styled-components";

export const BookingWrapper = styled.section`
  min-height: 100vh;
  background: #0d0d0d;
  padding: 4rem 0 7rem;

  @media (max-width: 768px) {
    padding: 3rem 0 6rem;
  }

  @media (max-width: 500px) {
    padding: 2rem 0 5rem;
  }
`;

export const BookingContainer = styled.div`
  width: min(120rem, 85%);
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100%, calc(100% - 3rem));
  }

  @media (max-width: 500px) {
    width: calc(100% - 2rem);
  }
`;

export const ProgressWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: #0d0d0d;
  border-bottom: 1px solid #232323;

  @media (max-width: 500px) {
    padding: 0.8rem 0;
    
  }
`;

export const ProgressTrack = styled.div`
  width: min(70rem, 100%);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 500px) {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }
`;

export const Step = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StepDot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #3f3f3f;
  transition: all 0.25s ease;
  z-index: 2;

  ${({ $active }) =>
    $active &&
    css`
      background: #ffffff;
      transform: scale(1.05);
      box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.12);
    `}

  ${({ $completed }) =>
    $completed &&
    css`
      background: #2183ebff;
    `}

  @media (max-width: 500px) {
    width: 0.85rem;
    height: 0.85rem;
  }
`;

export const StepLine = styled.div`
  position: absolute;
  top: 0.55rem;
  left: calc(50% + 1rem);
  width: calc(100% - 2rem);
  height: 2px;
  border-radius: 999px;
  background: #2b2b2b;
  transition: background 0.25s ease;

  ${({ $completed }) =>
    $completed &&
    css`
      background: #2183ebff;
    `}

  @media (max-width: 500px) {
    left: calc(50% + 0.8rem);
    width: calc(100% - 1.6rem);
  }
`;

export const StepLabel = styled.span`
  margin-top: 1.4rem;
  font-size: 1.4rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active }) => ($active ? "#f3e5e5ff" : "#737373")};
  transition: all 0.25s ease;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 500px) {
    font-size: 0.8rem;
    margin-top: 1rem;
  }
`;

export const Content = styled.main`
  margin-top: 4rem;
  min-height: 70vh;
  background: #131313ff;
  border-radius: 2.4rem;
  padding: 3rem;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.28);

  @media (max-width: 768px) {
    margin-top: 3rem;
    padding: 2.2rem;
    border-radius: 2rem;
  }

  @media (max-width: 500px) {
    margin-top: 2rem;
    padding: 1.6rem;
    border-radius: 1.6rem;
    min-height: auto;
  }
`;