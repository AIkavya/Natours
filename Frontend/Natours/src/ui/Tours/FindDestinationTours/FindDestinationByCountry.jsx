import { useNavigate } from "react-router-dom";
import {
  Header,
  Badge,
  Title,
  Subtitle,
  AuroraText,
} from "../../Grid/GridComponent.styles";

import { motion } from "framer-motion";
import {
  Section,
  CountryGrid,
  CountryCard,
  ImageWrapper,
  Image,
  Overlay,
  CountryInfo,
  CountryName,
  VisitText,
} from "./FindDestinationByCountry.styles";
import { useFindByCountry } from "../../../features/hooks/TourHooks/useFindByCountry";
function FindDestinationByCountry() {
  const navigate = useNavigate();
    const {data:countryData,isLoading,isError } = useFindByCountry();
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error...</div>
  const handleCountryClick = (country) => {
    navigate(`/search?country=${encodeURIComponent(country)}`);
  };
  return (
    <Section>
      <Header
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
      >
        <Badge>Best Destinations</Badge>

        <Title>
          Discover
          <br />
          <AuroraText>Around the World</AuroraText>
        </Title>

        <Subtitle>
          Explore the most popular destinations around the world.
        </Subtitle>
      </Header>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.985,
          y: 12,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.11,
        }}
        transition={{
          delay: 0.18,
          duration: 1.2,
        }}
      >
        <CountryGrid>
          {Object.entries(countryData).map(([country, image]) => (
            <CountryCard
              key={country}
              onClick={() => handleCountryClick(country)}
            >
              <ImageWrapper>
                <Image src={image.secureUrl} alt={country} />
                <Overlay />
              </ImageWrapper>

              <CountryInfo>
                <CountryName>{country}</CountryName>
                <VisitText>Visit {country} →</VisitText>
              </CountryInfo>
            </CountryCard>
          ))}
        </CountryGrid>
      </motion.div>
    </Section>
  );
}

export default FindDestinationByCountry;
