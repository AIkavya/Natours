import styled from "styled-components";

export const BookMarkContainer = styled.section`
  width: min(145rem, 92%);
  margin: 4rem auto 8rem;

  @media (max-width: 768px) {
    width: 95%;
    margin: 2rem auto 4rem;
  }
`;

export const BookMarkGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  gap: 2.4rem;

  align-items: stretch;

  justify-items: center;

  & > * {
    width: 100%;
    max-width: 320px;
    min-width: 0;
    flex: unset;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    gap: 1.8rem;

    & > * {
      max-width: 100%;
    }
  }
`;
