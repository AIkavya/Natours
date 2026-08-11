import styled from 'styled-components';
import { useState } from 'react';
import { ButtonGroup, CTASection, CTAContent, CTAOverlay, Container, PrimaryButton } from "../About/About.styles"
import { useNavigate } from "react-router-dom"
import { Search } from 'lucide-react';
const Section = styled.section`
  width: 100%;
  padding: 4rem 0 2rem;
  overflow: hidden;
  background: #04070e;
`;
const SafeImage = ({ src, fallbackSrc, alt, className, style }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <img
      src={imgSrc}
      alt={alt || "Luxe Travel"}
      className={className}
      style={style}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};

function TourEnd() {
    const Navigate = useNavigate()
    return (
      <Section>
        <Container style={{ backgroundColor: "black" }}>
          <CTASection>
            <SafeImage
              className="cta-bg"
              src={"/m.webp"}
              alt="Luxury Sunset Mountain Landscape"
            />
            <CTAOverlay />
            <CTAContent>
              <h2> Experience The World Differently</h2>
              <p>
                Connect directly with a Master Travel Curator to design your
                custom itinerary or request access to our private destination
                portfolio.
              </p>
              <ButtonGroup style={{ justifyContent: "center" }}>
                <PrimaryButton onClick={() => Navigate("/search")}>
                 <Search size={25} /> Search
                </PrimaryButton>
              </ButtonGroup>
            </CTAContent>
          </CTASection>
        </Container>
      </Section>
    );
};


export default TourEnd

