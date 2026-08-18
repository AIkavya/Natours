
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import {
  FooterContainer,
  FooterContent,
  BrandSection,
  LogoWrapper,
  LogoIcon,
  BrandTitle,
  BrandDesc,
  SocialLinks,
  SocialIcon,
  NavGrid,
  NavColumn,
  ColumnTitle,
  LinkList,
  FooterLink,
  BottomBar,
  Copyright,
} from "./Footer.styles";
import svg from "../../assets/tourist-bag-svgrepo-com.svg";

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Brand & Socials */}
        <BrandSection>
          <LogoWrapper>
            <LogoIcon src={svg} alt="Natours Logo" />
            <BrandTitle to="/">Natours</BrandTitle>
          </LogoWrapper>
          <BrandDesc>
            Discover extraordinary destinations worldwide with Natours. Guided
            adventures, custom travel itineraries, and memorable journeys.
          </BrandDesc>
          <SocialLinks>
            <SocialIcon
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </SocialIcon>
            <SocialIcon
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </SocialIcon>
          </SocialLinks>
        </BrandSection>

        {/* Navigation Links */}
        <NavGrid>
          <NavColumn>
            <ColumnTitle>Main Menu</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink to="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink to="/tours">All Tours</FooterLink>
              </li>
              <li>
                <FooterLink to="/search">Search Tours</FooterLink>
              </li>
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
            </LinkList>
          </NavColumn>

          <NavColumn>
            <ColumnTitle>Explore</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink to="/search?sort=Popularity">
                  Popular Packages
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/search?trending=true">
                  Trending Tours
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/search?minDiscount=10">
                  Special Offers
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/search?sort=Newest">Destinations</FooterLink>
              </li>
            </LinkList>
          </NavColumn>

          <NavColumn>
            <ColumnTitle>Account</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink to="/user">My Profile</FooterLink>
              </li>
              <li>
                <FooterLink to="/user/my-bookings">Bookings</FooterLink>
              </li>
              <li>
                <FooterLink to="/user/reviews">Reviews</FooterLink>
              </li>
              <li>
                <FooterLink to="/user">Account Settings</FooterLink>
              </li>
            </LinkList>
          </NavColumn>

          <NavColumn>
            <ColumnTitle>Support</ColumnTitle>
            <LinkList>
              <li>
                <FooterLink as="a" href="/#help">
                  Help Center
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/policy">Terms & Conditions</FooterLink>
              </li>
            </LinkList>
          </NavColumn>
        </NavGrid>
      </FooterContent>

      <BottomBar>
        <Copyright>
          &copy; {new Date().getFullYear()} Natours Inc. All rights reserved.
        </Copyright>
      </BottomBar>
    </FooterContainer>
  );
}

export default Footer;
