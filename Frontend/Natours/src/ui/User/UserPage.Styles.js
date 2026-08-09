import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  height: 100vh;
  overflow: hidden;
  background: #0c0c0c;

  @media (max-width: 1024px) {
    grid-template-columns: 24rem 1fr;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

/* ==========================
   Sidebar
========================== */

export const SideBar = styled.aside`
  display: grid;
  grid-template-rows: 8rem 1fr 8rem;
  background: #111111;
  border-right: 1px solid #252525;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-template-rows: none;
    border-right: none;
    border-bottom: 1px solid #252525;
    transition: all 0.3s ease;

    ${({ $isOpen }) =>
      $isOpen &&
      css`
        position: fixed;
        inset: 0;
        z-index: 99999;
        height: 100vh;
        width: 100vw;
        background: #0d0d0d;
        padding: 1.5rem;
        overflow-y: auto;
        justify-content: space-between;
      `}
  }
`;

/* ==========================
   Header
========================== */

export const HeaderSiderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #252525;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    border-bottom: ${({ $isOpen }) => ($isOpen ? "1px solid #252525" : "none")};
  }
`;

export const UserPill = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  gap: 1.2rem;

  padding: 0.8rem 1.2rem;

  background: #171616;
  border: 1px solid #2f2f2f;
  border-radius: 1.6rem;

  transition: 0.25s ease;
  cursor: pointer;

  &:hover {
    border-color: #3b82f6;
    background: #1e1d1d;
  }
`;

export const ImageWrapper = styled.div`
  width: 4.8rem;
  height: 4.8rem;

  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const UserName = styled.span`
  flex: 1;

  font-size: 1.6rem;
  font-weight: 600;
  color: #faf7f7;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ToggleChevron = styled.span`
  display: none;
  font-size: 2.2rem;
  color: #9c9c9c;
  transition: transform 0.3s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/* ==========================
   Menu
========================== */

export const MainMenuSideBar = styled.main`
  padding: 2rem 1.5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 100px;
  }

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
    overflow-y: auto;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }
`;

/* ==========================
   Footer
========================== */

export const FooterSideBar = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  border-top: 1px solid #252525;

  color: #9c9c9c;
  font-size: 1rem;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    padding-top: 1.5rem;
  }
`;

/* ==========================
   Main Content
========================== */

export const MainBar = styled.main`
  background: #0c0c0c;
  overflow-y: auto;
  padding: 3rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2d2d2d;
    border-radius: 100px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    overflow-y: visible;
  }
`;

/* ==========================
   Sidebar Menu
========================== */

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
  }
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  padding: 1.3rem 1.5rem;

  border-radius: 1.2rem;

  color: #bdbdbd;
  text-decoration: none;

  transition: all 0.25s;

  &:hover {
    background: #202020;
    color: white;
  }

  &.active {
    background: #202020;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 1.4rem 1.6rem;
    font-size: 1.6rem;
    gap: 1.2rem;
    background: #171717;
    border: 1px solid #282828;

    &.active {
      background: #2563eb;
      color: white;
      border-color: #2563eb;
    }
  }
`;

export const MenuIcon = styled.span`
  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.9rem;
`;

/* ==========================
   Footer
========================== */

export const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const FooterButton = styled(Link)`
  flex: 1;

  height: 4.4rem;

  border: ${({ primary }) =>
    primary ? "1px solid transparent" : "1px solid #353535"};

  background: ${({ primary }) => (primary ? "#f7faff" : "transparent")};

  color: ${({ primary }) => (primary ? "#000000" : "#ffffff")};

  border-radius: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    background: ${({ primary }) => (primary ? "transparent" : "#f7faff")};
    color: ${({ primary }) => (primary ? "#ffffff" : "#000000")};
    border: ${({ primary }) =>
      primary ? "1px solid #353535" : "1px solid transparent"};
  }

  svg {
    font-size: 1.7rem;
  }

  @media (max-width: 768px) {
    height: 4.8rem;
    font-size: 1.4rem;
  }
`;

export const Logout = styled.button`
  background-color: #de1818;
  color: #ffffff;
  padding: 1rem 1.3rem;
  border: 1px solid black;
  border-radius: 1.2rem;
  margin-top: auto;
  font-size: 1.35rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    color: #ff0000;
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 1.4rem 1.6rem;
    font-size: 1.5rem;
    width: 100%;
  }
`;