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
  const onNext = () => {};

  const onPrev = () => {};

  return (
    <div>
      <Container>
        <Inner style={{ transform: `translate` }}>{children}</Inner>
      </Container>
      <div>
        <button type="button" onClick={onNext}>
          Next
        </button>
        <button type="button" onClick={onPrev}>
          Prev
        </button>
      </div>
    </div>
  );
};

export default Slider;
