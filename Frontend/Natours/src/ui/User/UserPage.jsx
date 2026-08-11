import { useState, Suspense } from "react";
import { useLogout } from "../../features/hooks/UserHooks/useLogout";
import toast from "react-hot-toast";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import FullSpinner from "../FullSpinner";
import {
  LuUserRound,
  LuBookmark,
  LuCalendarCheck2,
  LuHeadset,
  LuStar,
  LuArrowLeft,
  LuMap,
  LuChevronDown,
} from "react-icons/lu";

import {
  Layout,
  SideBar,
  MainBar,
  HeaderSiderBar,
  MainMenuSideBar,
  FooterSideBar,
  UserPill,
  ImageWrapper,
  Image,
  UserName,
  ToggleChevron,
  Menu,
  MenuItem,
  MenuIcon,
  FooterLinks,
  FooterButton,
  Logout,
} from "./UserPage.Styles";

const menuItems = [
  {
    title: "Manage Account",
    path: "manage-account",
    icon: LuUserRound,
  },
  {
    title: "Bookmarked Tours",
    path: "bookmarked-tours",
    icon: LuBookmark,
  },
  {
    title: "Booked Tours",
    path: "my-bookings",
    icon: LuCalendarCheck2,
  },
  {
    title: "Assistance",
    path: "assistance",
    icon: LuHeadset,
  },
  {
    title: "Reviewed Tours",
    path: "reviews",
    icon: LuStar,
  },
];

function UserPage({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { logout } = useLogout({
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  function handleLogout() {
    closeMenu();
    logout();
  }

  return (
    <Layout>
      <SideBar $isOpen={isMenuOpen}>
        <HeaderSiderBar $isOpen={isMenuOpen}>
          <UserPill
            onClick={toggleMenu}
            role="button"
            tabIndex={0}
            aria-expanded={isMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            <ImageWrapper>
              <Image
                src={
                  user.photo !== "default-user.jpg"
                    ? user.photo.url
                    : "/user.svg"
                }
                alt="User"
              />
            </ImageWrapper>

            <UserName>{user.name}</UserName>

            <ToggleChevron $isOpen={isMenuOpen}>
              <LuChevronDown />
            </ToggleChevron>
          </UserPill>
        </HeaderSiderBar>

        <MainMenuSideBar $isOpen={isMenuOpen}>
          <Menu>
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <MenuItem
                  key={item.path}
                  as={NavLink}
                  to={item.path}
                  end
                  onClick={closeMenu}
                >
                  <MenuIcon>
                    <Icon />
                  </MenuIcon>
                  {item.title}
                </MenuItem>
              );
            })}

            <Logout onClick={handleLogout}>Logout</Logout>
          </Menu>
        </MainMenuSideBar>

        <FooterSideBar $isOpen={isMenuOpen}>
          <FooterLinks>
            <FooterButton as={Link} to="/" onClick={closeMenu}>
              <LuArrowLeft />
              Back
            </FooterButton>

            <FooterButton as={Link} to="/tours" primary onClick={closeMenu}>
              <LuMap />
              Explore Tours
            </FooterButton>
          </FooterLinks>
        </FooterSideBar>
      </SideBar>

      <MainBar>
        <Suspense fallback={<FullSpinner />}>
          <Outlet />
        </Suspense>
      </MainBar>
    </Layout>
  );
}

export default UserPage;
