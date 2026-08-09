import { useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";

import {
  CardWrapper,
  CardImage,
  ShadowOverlay,
  TextGradient,
  Badge,
  ContentBox,
  Title,
  Description,
  ExploreLink,
} from "./TourCard.styles";

const springTransition = {
  type: "spring",
  stiffness: 110,
  damping: 20,
  mass: 0.9,
};

function getCardLayout(offset, width) {
  const abs = Math.abs(offset);

  if (abs > 2) return null;

  const isLeft = offset < 0;

  /* =========================
      MOBILE (<=700px)
     ========================= */

  // Mobile Small (<=400px)
  if (width <= 400) {
    if (abs === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        zIndex: 50,
      };
    }

    return {
      x: abs * 14, // smaller horizontal offset
      y: abs * 18,
      scale: 1 - abs * 0.03,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      zIndex: 50 - abs,
    };
  }

  // Mobile (401px - 700px)
  if (width <= 700) {
    if (abs === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        zIndex: 50,
      };
    }

    return {
      x: abs * 22, // original value
      y: abs * 18,
      scale: 1 - abs * 0.03,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      zIndex: 50 - abs,
    };
  }

  /* =========================
      TABLET (701px–1000px)
     ========================= */

  if (width <= 1000) {
    if (abs === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        zIndex: 50,
      };
    }

    if (abs === 1) {
      return {
        x: isLeft ? -130 : 130,
        y: 8,
        scale: 0.92,
        rotateY: 0,
        rotateZ: 0,
        opacity: 0.9,
        zIndex: 40,
      };
    }

    return {
      x: isLeft ? -230 : 230,
      y: 18,
      scale: 0.84,
      rotateY: 0,
      rotateZ: 0,
      opacity: 0.75,
      zIndex: 30,
    };
  }

  /* =========================
      DESKTOP (>1000px)
     ========================= */

  if (abs === 0) {
    return {
      x: 0,
      y: -25,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      zIndex: 50,
    };
  }

  if (abs === 1) {
    return {
      x: isLeft ? -180 : 180,
      y: 15,
      scale: 0.88,
      rotateY: isLeft ? 28 : -28,
      rotateZ: isLeft ? -6 : 6,
      opacity: 0.9,
      zIndex: 40,
    };
  }

  return {
    x: isLeft ? -320 : 320,
    y: 60,
    scale: 0.76,
    rotateY: isLeft ? 42 : -42,
    rotateZ: isLeft ? -10 : 10,
    opacity: 0.65,
    zIndex: 30,
  };
}

function getTheme(theme) {
  let result = "";
  for (let i = 0; i < theme.length; i++) {
    if (i === 0) {
      result += theme[0].toUpperCase();
      continue;
    }

    result += theme[i];
  }
  return result;
}

export default function TourCard({ card, offset, dragX, isActive, onClick }) {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layout = getCardLayout(offset, width);

  const dragRotateZ = useTransform(dragX, [-250, 0, 250], [-5, 0, 5]);

  const dragScale = useTransform(dragX, [-250, 0, 250], [0.95, 1, 0.95]);

  if (!layout) return null;

  const overlayOpacity = isActive ? 0 : Math.abs(offset) === 1 ? 0.25 : 0.45;

  const THEME = getTheme(card.theme);
  return (
    <CardWrapper onTap={onClick} animate={layout} transition={springTransition}>
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          rotateZ: width <= 700 ? 0 : dragRotateZ,
          scale: width <= 700 ? 1 : dragScale,
        }}
      >
        <CardImage src={card.image} alt={card.title} draggable={false} />

        <ShadowOverlay animate={{ opacity: overlayOpacity }} />

        <TextGradient />

        <Badge>{card.badge}</Badge>

        <ContentBox>
          <Title>{card.title}</Title>

          <Description>{card.description}</Description>

          <ExploreLink to={`/search?theme=${THEME}`}>Explore More</ExploreLink>
        </ContentBox>
      </motion.div>
    </CardWrapper>
  );
}
