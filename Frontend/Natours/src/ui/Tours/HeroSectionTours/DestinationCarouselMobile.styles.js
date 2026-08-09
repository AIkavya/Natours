import styled from "styled-components";

export const MobileCarouselSection = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  position: relative;
  top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
`;

export const MobileHeroCard = styled.div`
  position: relative;
  width: 100%;
  min-height: 540px;
  border-radius: 20px;
  overflow: hidden;
  background-image: ${({ $image }) => `
    url(${$image})
  `};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  touch-action: pan-y;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const MobileGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #3822dfff 60%, #01000aff);
  z-index: 1;
`;

export const MobileHeroContent = styled.div`
  position: relative;
  z-index: 2;
  top: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 2rem 1.25rem 1.25rem 1.25rem;
  box-sizing: border-box;
  color: white;
`;

export const MobileCountryTag = styled.span`
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: #f3f1ff;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const MobileTitle = styled.h2`
  font-size: clamp(2rem, 6.5vw, 3.2rem);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: #ffffff;
`;

export const MobileDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(237, 222, 222, 0.85);
  margin-bottom: 1.5rem;
  max-width: 100%;
`;
export const MobileCardsScrollArea = styled.div`
  width: 100%;
  margin-top: auto;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MobileCardsTrack = styled.div`
  display: flex;
  gap: 2rem;
  background-color: #1438c747;
  width: max-content;

  > * {
    scroll-snap-align: start;
    flex-shrink: 0;
  }
`;

export const MobileTimelineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
