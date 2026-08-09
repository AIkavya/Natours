import styled, { css } from "styled-components";

export const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;

  display: grid;
  grid-template-columns: 280px 1fr;

  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);

  transition: all 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  min-height: 240px;
  object-fit: cover;

  @media (max-width: 850px) {
    height: 200px;
    min-height: 180px;
  }
`;

export const Content = styled.div`
  padding: 2.2rem;

  @media (max-width: 500px) {
    padding: 1.5rem;
  }
`;

export const TourName = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.8rem;

  @media (max-width: 500px) {
    font-size: 1.9rem;
  }
`;

export const Status = styled.span`
  display: inline-flex;

  padding: 0.45rem 1rem;

  border-radius: 50px;

  font-size: 1.3rem;

  font-weight: 600;

  margin-bottom: 2rem;

  ${({ status }) =>
    status === "Confirmed"
      ? css`
          background: #dcfce7;
          color: #15803d;
        `
      : status === "pending"
        ? css`
            background: #1d1d1cff;
            color: #ffffffff;
          `
        : css`
            background: #fee2e2;
            color: #b91c1c;
          `}
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 2rem;

  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

export const Item = styled.div``;

export const Label = styled.p`
  color: #9ca3af;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

export const Value = styled.p`
  color: #111827;
  font-size: 1.55rem;
  font-weight: 600;
`;

export const Footer = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  border-top: 1px solid #e5e7eb;

  padding-top: 2rem;

  gap: 2rem;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
`;

export const Amount = styled.h3`
  font-size: 2.2rem;
  color: #111827;
  margin-bottom: 0.3rem;

  @media (max-width: 500px) {
    font-size: 1.9rem;
  }
`;

export const Remaining = styled.p`
  color: #ef4444;
  font-size: 1.35rem;
  margin-bottom: 0.5rem;
`;

export const Button = styled.a`
  background: #0f172a;

  color: white;

  padding: 1rem 2rem;

  border-radius: 12px;

  text-decoration: none;

  font-size: 1.45rem;

  font-weight: 600;

  transition: 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;

  &:hover {
    background: #1d4ed8;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;
