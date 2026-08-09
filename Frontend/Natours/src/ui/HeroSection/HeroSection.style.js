import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeroWrapper = styled.section`
  width: 100%;
  height: 100dvh;
  min-height: 520px;
  background: #000;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  

  /* Natural space below fixed 60px Navbar and around Hero Card */
  padding: clamp(100px, 9vh, 90px) clamp(1rem, 4vw, 4rem)
    clamp(1rem, 3vh, 2.5rem);
`;

export const HeroSection = styled.section`
  position: relative;

  width: min(90%, 1600px);
  margin: 0 auto;

  flex: 1;

  overflow: hidden;
  border-radius: clamp(16px, 2.5vw, 28px);
  background: #000;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);

  @media (max-width: 1200px) {
    width: 86%;
  }

  @media (max-width: 768px) {
    width: 92%;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
`;

export const Background = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  object-fit: cover;
  object-position: center;
  will-change: transform, filter, opacity;
  z-index: 1;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(55, 10, 233, 0.13), rgba(15, 15, 15, 0.45)),
    linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0.45) 40%,
      transparent 60%
    );
  z-index: 2;
`;

/* Flex container filling entire HeroSection card */
export const Content = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  padding: clamp(1.2rem, 3vw, 2.5rem);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

export const HeaderSection = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const SearchButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.5rem;

  width: clamp(7.5rem, 10vw, 10rem);
  height: clamp(2.4rem, 3.2vw, 3rem);

  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.71);
  backdrop-filter: blur(18px);

  color: #fff;
  text-decoration: none;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  z-index: 20;

  transition: all 0.3s ease;

  svg {
    font-size: clamp(1.3rem, 1.8vw, 2.2rem);
  }

  &:hover {
    background: #fff;
    color: #000;
    border-color: #fff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const HeroHeadingSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  transition: transform 0.35s ease;

  /* Large Laptop */
  @media (max-width: 1400px) {
    transform: translateY(-2rem);
  }

  /* Laptop */
  @media (max-width: 1200px) {
    transform: translateY(-1.5rem);
  }

  /* Tablet */
  @media (max-width: 992px) {
    transform: translateY(0rem);
  }

  /* Tablet Portrait */
  @media (max-width: 768px) {
    transform: translateY(1rem);
  }

  /* Large Mobile */
  @media (max-width: 576px) {
    transform: translateY(2rem);
  }

  /* Mobile */
  @media (max-width: 430px) {
    transform: translateY(3rem);
  }

  /* Small Mobile */
  @media (max-width: 375px) {
    transform: translateY(4rem);
  }
`;

export const Specil = styled.h1`
  color: #020202ea;
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  text-align: center;

  margin: 0;
  width: 100%;

  font-size: clamp(3rem, 6vw, 7rem);

  @media (max-width: 1400px) {
    font-size: 6rem;
  }

  @media (max-width: 1200px) {
    font-size: 5.8rem;
  }

  @media (max-width: 992px) {
    font-size: 5.4rem;
  }

  @media (max-width: 768px) {
    font-size: 5rem;
  }

  @media (max-width: 576px) {
    font-size: 4.5rem;
  }

  @media (max-width: 430px) {
    font-size: 4rem;
  }

  @media (max-width: 375px) {
    font-size: 3.6rem;
  }
`;

/* FlexSpacer absorbs all remaining vertical space pushing heading up (upper 30-40%) and buttons down */
export const FlexSpacer = styled.div`
  flex: 1;
  min-height: 1rem;
`;

export const FooterSection = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: clamp(0.8rem, 2vw, 1.5rem);
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 500px) {
    flex-direction: column;
    width: 90%;
    gap: 0.75rem;
  }
`;

export const Button = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.75rem, 1.4vw, 1rem) clamp(1.6rem, 3.2vw, 2.5rem);

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;

  background: rgba(0, 0, 0, 0.607);
  backdrop-filter: blur(16px);

  color: white;

  font-size: clamp(0.85rem, 1.1vw, 1.2rem);
  font-weight: 300;
  white-space: nowrap;
  cursor: pointer;

  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 0.8rem 1.2rem;
  }
`;

export const ButtonSec = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.75rem, 1.4vw, 1rem) clamp(1.6rem, 3.2vw, 2.5rem);

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;

  background: rgba(217, 217, 218, 1);
  backdrop-filter: blur(16px);

  color: black;

  font-size: clamp(0.85rem, 1.1vw, 1.2rem);
  font-weight: 300;
  white-space: nowrap;
  cursor: pointer;

  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 0.8rem 1.2rem;
  }
`;
