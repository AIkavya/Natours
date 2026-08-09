import {
  TimelineHorizontalWrapper,
  TimelineHorizontalItem,
  TimelineHorizontalNumber,
  TimelineHorizontalDot,
  TimelineHorizontalLine,
} from "./TimelineHorizontal.style";

function TimelineHorizontal({ totalSlides, activeIndex, onSelect }) {
  return (
    <TimelineHorizontalWrapper>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <TimelineHorizontalItem key={index} onClick={() => onSelect(index)}>
          <TimelineHorizontalNumber $active={index === activeIndex}>
            {String(index + 1).padStart(2, "0")}
          </TimelineHorizontalNumber>

          <TimelineHorizontalDot $active={index <= activeIndex} />

          {index !== totalSlides - 1 && (
            <TimelineHorizontalLine $active={index < activeIndex} />
          )}
        </TimelineHorizontalItem>
      ))}
    </TimelineHorizontalWrapper>
  );
}

export default TimelineHorizontal;
