import styled from "styled-components";

export const Container = styled.div`
  width: min(130rem, 92%);
  margin: 5rem auto;

  @media (max-width: 768px) {
    width: 100%;
    margin: 2rem auto;
  }
`;

export const Header = styled.div`
  margin-bottom: 3.5rem;

  @media (max-width: 500px) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 700;
  color: #ffffffff;
`;

export const Subtitle = styled.p`
  margin-top: 0.8rem;
  color: #b5b7bcff;
  font-size: clamp(1.35rem, 2vw, 1.7rem);
`;

export const Grid = styled.div`
  display: grid;
  gap: 2.5rem;

  @media (max-width: 500px) {
    gap: 1.6rem;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 40vh;

  font-size: 2rem;
  font-weight: 600;
  color: #6b7280;
`;

export const EmptyState = styled.div`
  min-height: 45vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fff;

  border-radius: 20px;

  padding: 5rem;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    color: #111827;
    margin-bottom: 1rem;
  }

  p {
    font-size: clamp(1.3rem, 2vw, 1.6rem);
    color: #6b7280;
    text-align: center;
    max-width: 45rem;
  }

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
  }
`;
