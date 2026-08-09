import styled from "styled-components";

export const TimelineHorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
`;

export const TimelineHorizontalItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const TimelineHorizontalNumber = styled.span`
  font-size: ${({ $active }) => ($active ? "0.95rem" : "0.8rem")};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255,255,255,0.45)")};
  margin-right: 6px;
  transition: all 0.35s ease;
`;

export const TimelineHorizontalDot = styled.div`
  width: ${({ $active }) => ($active ? "12px" : "8px")};
  height: ${({ $active }) => ($active ? "12px" : "8px")};
  border-radius: 50%;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, #0008ff, #111111)"
      : "rgba(19, 19, 227, 0.8)"};
  box-shadow: ${({ $active }) =>
    $active ? "0 0 14px rgba(70, 33, 255, 0.9)" : "none"};
  transition: all 0.35s ease;
`;

export const TimelineHorizontalLine = styled.div`
  height: 2px;
  width: clamp(20px, 6vw, 36px);
  margin: 0 6px;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "linear-gradient(90deg, #f0f0f0, #031231)" : "rgba(255,255,255,0.18)"};
  transition: background 0.35s ease;
`;
