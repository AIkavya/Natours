import { motion } from "framer-motion";

import Carousel from "../../components/Carousel";

import {
  Section,
  
} from "./CarouselSection.styles";
import {
  AuroraText,
  Header,
  Badge,
  Title,
  Subtitle
} from "../Grid/GridComponent.styles";

const ease = [0.16, 1, 0.3, 1];

export default function CarouselSection() {
  return (
    <Section>
    <Header
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
            >
              <Badge>Life Beyond Noise</Badge>
    
              <Title>
                Discover
                <br />
                <AuroraText>Beyond The Ordinary</AuroraText>
              </Title>
    
              <Subtitle>
                Wander through extraordinary destinations from every corner of the
                world. Pause, explore, and uncover journeys that inspire your next
                adventure.
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
          ease,
        }}
      >
        <Carousel />
      </motion.div>
    </Section>
  );
}
