import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  background-color: black;
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid rgba(228, 227, 227, 0.833);
  border-top-color: #3813db;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export default function FullSpinner() {
  return (
    <SpinnerContainer>
      <Loader />
    </SpinnerContainer>
  );
}
