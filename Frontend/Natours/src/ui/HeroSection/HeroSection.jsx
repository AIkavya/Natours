import { LuSearch } from "react-icons/lu";

import {
  HeroWrapper,
  HeroSection,
  Background,
  HeaderSection,
  HeroHeadingSection,
  FlexSpacer,
  FooterSection,
  Overlay,
  Content,
  Specil,
  Button,
  Buttons,
  ButtonSec,
  SearchButton,
} from "./HeroSection.style";

function Hero() {
  return (
    <HeroWrapper>
      <HeroSection>
        <Background
          src="hero.webp"
          alt="Travel Hero"
          width="1920"
          height="1080"
          decoding="async"
          fetchPriority="high"
        />

        <Overlay />

        <Content>
          <HeaderSection>
            <SearchButton to="/search">
              <LuSearch /> Search
            </SearchButton>
          </HeaderSection>
          <HeroHeadingSection>
            <Specil>
              EXPERIENCE
              <br />
              BEYOND BOUNDARIES
            </Specil>
          </HeroHeadingSection>

          <FlexSpacer />

          <FooterSection>
            <Buttons>
              <Button to="/tours">Explore Tours</Button>
              <ButtonSec to="/about">Learn More</ButtonSec>
            </Buttons>
          </FooterSection>
        </Content>
      </HeroSection>
    </HeroWrapper>
  );
}

export default Hero;
