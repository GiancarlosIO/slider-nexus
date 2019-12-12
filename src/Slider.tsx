import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Inner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  & > div {
    min-width: 100%;
  }
  transition: transform 0.3s ease;
`;

const Slider = ({ children }) => {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const childrens = React.Children.toArray(children);

  const onNext = () => {
    setCurrentIndex(index => {
      if (currentIndex >= childrens.length - 1) {
        return 0;
      }
      return index + 1;
    });
  };

  const onPrev = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex(index => index - 1);
  };

  React.useLayoutEffect(() => {
    if (innerRef.current) {
      setSlideWidth(innerRef.current.getBoundingClientRect().width);
    }
  }, []);

  console.log({ currentIndex, slideWidth });

  return (
    <div>
      <Container>
        <Inner
          style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
          ref={innerRef}
        >
          {children}
        </Inner>
      </Container>
      <div>
        <button type="button" onClick={onPrev}>
          Prev
        </button>
        <button type="button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;
