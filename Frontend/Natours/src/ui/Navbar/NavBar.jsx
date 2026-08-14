import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import {
  LoginButton,
  Logo,
  Nav,
  NavItem,
  NavMenu,
  StyledLink,
  LogoIcon,
  LogoText,
  MobileToggle,
} from "./NavBar.styles";
import svg from "../../assets/tourist-bag-svgrepo-com.svg";
import useUser from "../../features/hooks/UserHooks/useUser";

function NavBar() {
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <Nav scroll={scrolled}>
      <Logo>
        <LogoIcon src={svg} alt="Natours Logo" />
        <LogoText to="/" onClick={closeMenu}>
          Natours
        </LogoText>
      </Logo>

      <MobileToggle onClick={toggleMenu} aria-label="Toggle navigation menu">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </MobileToggle>

      <NavMenu $isOpen={isOpen}>
        <NavItem>
          <StyledLink to="/" onClick={closeMenu}>
            Home
          </StyledLink>
        </NavItem>

        <NavItem>
          <StyledLink to="/tours" onClick={closeMenu}>
            Tours
          </StyledLink>
        </NavItem>

        <NavItem>
          <StyledLink to="/about" onClick={closeMenu}>
            About
          </StyledLink>
        </NavItem>

        {!user && (
          <NavItem>
            <LoginButton to="/user/login" onClick={closeMenu}>
              Login
            </LoginButton>
          </NavItem>
        )}

        {user && (
          <NavItem>
            <LoginButton to="/user" onClick={closeMenu}>
              User
            </LoginButton>
          </NavItem>
        )}
      </NavMenu>
    </Nav>
  );
}

export default NavBar;

