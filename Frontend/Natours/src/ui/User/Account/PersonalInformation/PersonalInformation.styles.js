import styled from "styled-components";

export const Card = styled.div`
  background: transparent;
  /* border: 1px solid #262626; */
  border-radius: 2rem;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.8rem;
  }

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 500px) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h2`
  color: white;
  font-size: clamp(2rem, 3vw, 2.6rem);
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const Description = styled.p`
  color: #9c9c9c;
  font-size: clamp(1.35rem, 1.8vw, 1.5rem);
  line-height: 1.7;
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.2rem;
    margin-bottom: 2.5rem;
  }
`;

export const Avatar = styled.img`
  width: 10rem;
  height: 10rem;

  border-radius: 50%;
  object-fit: cover;

  border: 4px solid #222;

  @media (max-width: 500px) {
    width: 8.5rem;
    height: 8.5rem;
  }
`;

export const UploadButton = styled.button`
  border: 1px solid white;
  cursor: pointer;

  background: #f7f9fc;
  color: black;

  padding: 1.2rem 2rem;

  border-radius: 0.35rem;

  font-size: 1.4rem;
  font-weight: 600;

  transition: 0.25s;

  &:hover {
    background: #141414;
    color: white;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 1rem 1.6rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 500px) {
    gap: 1.8rem;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Label = styled.label`
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
`;

export const Input = styled.input`
  background: #1d1d1d;
  border: 1px solid #2e2e2e;

  color: white;

  padding: 1.3rem 1.5rem;

  border-radius: 1rem;

  font-size: 1.5rem;

  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  &[readonly] {
    color: #bdbdbd;
  }

  @media (max-width: 500px) {
    padding: 1.1rem 1.2rem;
    font-size: 1.4rem;
  }
`;

export const Select = styled.select`
  background: #1d1d1d;
  color: white;

  border: 1px solid #2e2e2e;

  padding: 1.3rem 1.5rem;

  border-radius: 1rem;

  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  @media (max-width: 500px) {
    padding: 1.1rem 1.2rem;
    font-size: 1.4rem;
  }
`;

export const TextArea = styled.textarea`
  background: #1d1d1d;
  color: white;

  border: 1px solid #2e2e2e;

  border-radius: 1rem;

  resize: vertical;

  padding: 1.5rem;

  font-size: 1.5rem;

  min-height: 16rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }

  @media (max-width: 500px) {
    padding: 1.2rem;
    font-size: 1.4rem;
    min-height: 12rem;
  }
`;

export const EmailWrapper = styled.div`
  position: relative;
`;

export const VerifiedBadge = styled.div`
  position: absolute;

  top: 50%;
  right: 1.2rem;

  transform: translateY(-50%);

  background: #feffff;

  color: black;

  padding: 0.5rem 1rem;

  border-radius: 100px;

  font-size: 1.2rem;

  font-weight: 600;
`;

export const SaveButton = styled.button`
  align-self: flex-start;

  border: 1px solid white;
  cursor: pointer;

  background: #e3e3e3;

  color: #151515;

  padding: 1.4rem 2.6rem;

  border-radius: 0.35rem;

  font-size: 1.3rem;

  font-weight: 700;

  transition: 0.25s;

  &:hover {
    background: #0e0e0e;
    color: white;
  }

  @media (max-width: 500px) {
    width: 100%;
    align-self: stretch;
    padding: 1.3rem 2rem;
  }
`;
