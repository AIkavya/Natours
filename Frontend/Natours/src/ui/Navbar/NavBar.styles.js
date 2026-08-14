import styled from "styled-components";
import { NavLink } from "react-router-dom";
export const MyAnchor = styled.a`
  color: white;
  text-decoration: none;
`;
export const Nav = styled.nav`
  max-width: 100%;
  height: 60px;
  padding: 0 2rem;
  
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ scroll }) => (scroll ? "70%" : "100%")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  /* backdrop-filter: blur(18px); */
  z-index: 1000;
  /* margin-top: 15px; */
  transition:
    width 0.6s ease,
    border-radius 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.205s ease,
    top 0.25s ease;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid black;
  ${({ scroll }) => {
    if (scroll) {
      return `
     border-bottom:1px solid rgba(0,0,0,.08);
     border-radius: 35px;
      background: rgb(255,255,255);
      top: 2%;
     `;
    }
  }}
  @media (max-width: 768px) {
    padding: 0 1rem;
    width: ${({ scroll }) => (scroll ? "92%" : "100%")};
    ${({ scroll }) =>
      scroll &&
      `
      top: 1%;
    `}
  }
`;
export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding-left: 2rem;
  @media (max-width: 768px) {
    padding-left: 0.5rem;
  }
`;
export const LogoText = styled(NavLink)`
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #1933b6 30%, #0f172a 45%, #0f172a 25%);
  font-family: "Outfit", sans-serif;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`;
export const LogoIcon = styled.img`
  position: relative;
  width: 3rem;
  @media (max-width: 768px) {
    width: 2.2rem;
  }
`;
export const MobileToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #0f172a;
  cursor: pointer;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: transform 0.2s ease;
  &:active {
    transform: scale(0.95);
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;
export const NavItem = styled.li`
  list-style: none;
  transition: opacity 0.3s ease;
  @media (max-width: 900px) {
    width: 100%;
    text-align: center;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
  &:hover ${NavItem} {
    opacity: 0.4;
  }
  ${NavItem}:hover {
    opacity: 1;
  }
  @media (max-width: 900px) {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.5rem 0;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateY(0)" : "translateY(-10px)"};
    transition: all 0.3s ease-in-out;
    pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  }
`;

export const StyledLink = styled(NavLink)`
  text-decoration-line: none;
  color: black;
  font-family: 700;
  cursor: pointer;
  padding: 10px 16px;
  transition: all 0.25s ease;
  &:hover {
    color: #ffffffff;
    /* text-decoration: underline #0621a9; */
    background-color: #0621a9;
    border-radius: 10px;
  }
  @media (max-width: 900px) {
    display: inline-block;
    width: 80%;
    padding: 12px 16px;
  }
`;
export const LoginButton = styled(NavLink)`
  text-decoration-line: none;
  font-weight: 500;
  font-size: 14px;
  padding: 12px;
  border: 1px solid black;
  border-radius: 12px;
  cursor: pointer;
  background-color: #1933b6;
  color: white;
  border: none;
  transition: all 0.25s ease;
  &:hover {
    background: linear-gradient(
      135deg,
      #60a5fa 0%,
      #2563eb 40%,
      #1d4ed8 75%,
      #0f172a 100%
    );
    color: #ffffff;
    transform: translateY(-2px);
  }
  @media (max-width: 900px) {
    display: inline-block;
    width: 80%;
    text-align: center;
  }
`;
