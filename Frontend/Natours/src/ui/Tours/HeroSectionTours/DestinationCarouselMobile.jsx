import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";
import TimelineHorizontal from "./TimelineHorizontal";

import {
  MobileCarouselSection,
  MobileHeroCard,
  MobileGradientOverlay,
  MobileHeroContent,
  MobileCountryTag,
  MobileTitle,
  MobileDescription,
  MobileCardsScrollArea,
  MobileCardsTrack,
  MobileTimelineContainer,
} from "./DestinationCarouselMobile.styles";

function DestinationCarouselMobile({
  countries,
  activeCountry,
  setActiveCountry,
  country,
  cards,
  handleNext,
  handlePrevious,
}) {
  return (
    <MobileCarouselSection>
      <MobileHeroCard
        as={motion.div}
        key={country.country}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        $image={country.background}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          const threshold = 50;
          if (info.offset.x < -threshold) {
            handleNext();
          } else if (info.offset.x > threshold) {
            handlePrevious();
          }
        }}
      >
        <MobileGradientOverlay />

        <MobileHeroContent>
          <MobileCountryTag>{country.country.toUpperCase()}</MobileCountryTag>

          <MobileTitle>{country.title}</MobileTitle>

          <MobileDescription>{country.description}</MobileDescription>

          <MobileCardsScrollArea>
            <MobileCardsTrack>
              {cards.map((destination, index) => (
                <DestinationCard
                  key={`${destination.id}-${index}`}
                  destination={destination}
                />
              ))}
            </MobileCardsTrack>
          </MobileCardsScrollArea>
        </MobileHeroContent>
      </MobileHeroCard>

      <MobileTimelineContainer>
        <TimelineHorizontal
          totalSlides={countries.length}
          activeIndex={activeCountry}
          onSelect={setActiveCountry}
        />
      </MobileTimelineContainer>
    </MobileCarouselSection>
  );
}

export default DestinationCarouselMobile;
