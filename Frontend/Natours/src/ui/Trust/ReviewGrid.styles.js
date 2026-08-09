import styled from "styled-components";

export const Grid = styled.section`
  width: min(145rem, 90%);
  margin: 2rem auto;
  display: grid;

  /* Desktop */
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(9, 4.5rem);
  gap: 0.9rem;

  /* Tablet */
  @media (max-width: 1100px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto;
    grid-auto-rows: 18rem;
  }

  /* Mobile */
  @media (max-width: 700px) {
    width: 94%;
    grid-template-columns: 1fr;
    grid-auto-rows: 22rem;
    gap: 1rem;
  }
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  overflow: hidden;
  background: #fff;
`;

 export const Hero = styled(Item)`
  grid-column: 1 / 4;
  grid-row: 1 / 4;

  @media (max-width: 1100px) {
    grid-column: 1 / 4;
    grid-row: 1;
  }

  @media (max-width: 700px) {
    grid-column: 1;
    grid-row: auto;
  }
`;

export const Card2 = styled(Item)`
  grid-column: 4 / 7;
  grid-row: 1 / 4;

  @media (max-width: 1100px) {
    grid-column: 4 / 7;
    grid-row: 1;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const Card3 = styled(Item)`
  grid-column: 7 / 10;
  grid-row: 1 / 4;

  @media (max-width: 1100px) {
    grid-column: 1 / 4;
    grid-row: 2;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const Card4 = styled(Item)`
  grid-column: 10 / 13;
  grid-row: 1 / 4;

  @media (max-width: 1100px) {
    grid-column: 4 / 7;
    grid-row: 2;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const Card5 = styled(Item)`
  grid-column: 1 / 4;
  grid-row: 4 / 7;

  @media (max-width: 1100px) {
    grid-column: 1 / 3;
    grid-row: 3;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const VideoCard = styled(Item)`
  grid-column: 4 / 10;
  grid-row: 4 / 7;

  @media (max-width: 1100px) {
    grid-column: 3 / 7;
    grid-row: 3;
  }

  @media (max-width: 700px) {
    grid-column: 1;
    height: 22rem;
  }
`;

export const Card7 = styled(Item)`
  grid-column: 10 / 13;
  grid-row: 4 / 7;

  @media (max-width: 1100px) {
    grid-column: 1 / 3;
    grid-row: 4;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const Card8 = styled(Item)`
  grid-column: 1 / 4;
  grid-row: 7 / 10;

  @media (max-width: 1100px) {
    grid-column: 3 / 5;
    grid-row: 4;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const Card9 = styled(Item)`
  grid-column: 4 / 7;
  grid-row: 7 / 10;

  @media (max-width: 1100px) {
    grid-column: 5 / 7;
    grid-row: 4;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const Card10 = styled(Item)`
  grid-column: 7 / 10;
  grid-row: 7 / 10;

  @media (max-width: 1100px) {
    grid-column: 1 / 4;
    grid-row: 5;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;

export const Card11 = styled(Item)`
  grid-column: 10 / 13;
  grid-row: 7 / 10;

  @media (max-width: 1100px) {
    grid-column: 4 / 7;
    grid-row: 5;
  }

  @media (max-width: 700px) {
    grid-column: 1;
  }
`;