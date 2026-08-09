import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  padding: 8rem 0 8rem;
  overflow: hidden;
  background: #0b0b0b;
`;



export const CountryGrid = styled.div`
  width: min(140rem, 92%);
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    width: calc(100% - 2rem);
  }
`;

export const CountryCard = styled.article`
  position: relative;
  height: 20rem;
  overflow: hidden;
  border-radius: 1.8rem;
  cursor: pointer;
  isolation: isolate;

  background: #111;

  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-8px) scale(1.015);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 8px 20px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    height: 18rem;
  }

  @media (max-width: 500px) {
    height: 16rem;
  }
`;

export const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;

  object-fit: cover;
  object-position: center;

  transition:
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.5s ease;

  ${CountryCard}:hover & {
    transform: scale(1.08);
    filter: brightness(0.8);
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.3) 45%,
    rgba(0, 0, 0, 0) 75%
  );
`;

export const CountryInfo = styled.div`
  position: absolute;
  left: 2rem;
  right: 2rem;
  bottom: 1.8rem;

  color: white;

  transform: translateY(0);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  ${CountryCard}:hover & {
    transform: translateY(-4px);
  }
`;

export const CountryName = styled.h3`
  margin: 0;

  font-size: clamp(1.8rem, 2vw, 2.6rem);
  font-weight: 600;
  letter-spacing: -0.03em;
`;

export const VisitText = styled.span`
  display: block;

  margin-top: 0.5rem;

  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.75;

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  ${CountryCard}:hover & {
    opacity: 1;
    transform: translateX(4px);
  }
`;