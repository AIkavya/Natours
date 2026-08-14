import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background-color: #ffffff;
  color: #374151;
  padding: 4.5rem 3rem 2rem 3rem;
  border-top: 1px solid #e5e7eb;
  font-family: "Plus Jakarta Sans", "Poppins", sans-serif;
  width: 100%;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem 2rem 1.5rem;
  }
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 2.8fr;
  gap: 4rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid #f3f4f6;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LogoIcon = styled.img`
  width: 3.2rem;
  height: 3.2rem;
`;

export const BrandTitle = styled(Link)`
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #111827;
  font-family: "Outfit", "Plus Jakarta Sans", sans-serif;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

export const BrandDesc = styled.p`
  color: #6b7280;
  font-size: 1.35rem;
  line-height: 1.6;
  max-width: 28rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

export const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 1.5rem;
  transition: all 0.25s ease;
  text-decoration: none;
  border: 1px solid #e5e7eb;

  &:hover {
    background-color: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }
`;

export const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const NavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const ColumnTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  font-family: "Outfit", sans-serif;
  letter-spacing: 0.2px;
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterLink = styled(Link)`
  color: #4b5563;
  text-decoration: none;
  font-size: 1.35rem;
  font-weight: 500;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    color: #2563eb;
    transform: translateX(4px);
  }
`;

export const BottomBar = styled.div`
  max-width: 1280px;
  margin: 2rem auto 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
  font-size: 1.3rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1.2rem;
    text-align: center;
  }
`;

export const Copyright = styled.span`
  color: #6b7280;
`;

export const BottomLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 480px) {
    gap: 1.2rem;
  }
`;

export const BottomLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
  }
`;
