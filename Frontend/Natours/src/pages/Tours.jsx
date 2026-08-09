import DestinationCarousel from "../ui/Tours/HeroSectionTours/DestinationCarousel"
import { styled } from "styled-components";
import Offer from "../ui/Tours/OfferSection/Offers";
import FindDestinationByCountry from "../ui/Tours/FindDestinationTours/FindDestinationByCountry";
import TourEnd from "../ui/Tours/TourEnd";

const HeroSection = styled.div`
position: relative;
top:0rem;
width: 100%;
margin: 0 auto;
padding-bottom: 10rem;
background-color: #04070efb;
`;
function Tours() {
    return (
      <>
        <HeroSection>
          <DestinationCarousel />
        </HeroSection>
        <Offer />  
        <FindDestinationByCountry />
        <TourEnd />
      
      </>
    );
}

export default Tours
