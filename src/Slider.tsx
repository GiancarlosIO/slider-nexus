import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Inner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transition: transform 0.3s ease;
`;

const Slider = ({ children }) => {
  // const visibleElementIndex = React.useRef<number>(0);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const slideRef = React.useRef<HTMLDivElement>(null);

  const [computedValues, setComputedValues] = React.useState({
    containerWidth: 0,
    itemWidth: 0,
    gap: 0,
  });
  // const [innerSliderWidth, setInnerSlider] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const childrens = React.Children.toArray(children);

  const onNext = () => {
    const visibleElments = Math.round(
      computedValues.containerWidth / computedValues.itemWidth,
    );

    console.log({ visibleElments });

    setCurrentIndex(index => {
      /**
       * if we are showing multiples elements we need to reset the position if we are "showing" the last element
       * ---
       * Note that "showing" and "current" indexs are not the same
       * "Showing" index is the last element that is viewed in the slider
       * "Current" index is the index of the element tracked in the slider component itself
       */
      if (
        visibleElments > 1 &&
        visibleElments + currentIndex >= children.length
      ) {
        return 0;
      }

      /**
       * If we are in the last slide, reset the index
       */
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
    // if (innerRef.current) {
    //   setInnerSlider(innerRef.current.getBoundingClientRect().width);
    // }

    if (containerRef.current && slideRef.current) {
      const itemMarginCSSRule = window
        .getComputedStyle(slideRef.current, 'slide-nexus-slide')
        .getPropertyValue('margin')
        .split(' ');

      const gap = parseInt(
        (itemMarginCSSRule[1] || itemMarginCSSRule[3] || '0px').replace(
          'px',
          '',
        ),
        10,
      );

      setComputedValues({
        itemWidth: slideRef.current.getBoundingClientRect().width,
        containerWidth: containerRef.current.getBoundingClientRect().width,
        gap,
      });
    }
  }, []);

  // visibleElementIndex.current = Math.round(
  //   computedValues.containerWidth / computedValues.itemWidth,
  // );
  // We need to calculate what elements are visible!

  console.log({
    currentIndex,
    // innerSliderWidth,
    // visibleIndex: visibleElementIndex.current,
    computedValues,
  });

  /**
   * TODO: ADD CSS PREFIX TO TRAMSLATE CSS RULE
   *
   */

  return (
    <div>
      <Container ref={containerRef}>
        <Inner
          style={{
            transform: `translateX(-${currentIndex * computedValues.itemWidth +
              currentIndex * computedValues.gap}px)`,
          }}
          ref={innerRef}
        >
          {childrens.map(childrenEl =>
            React.cloneElement(childrenEl, {
              ref: slideRef,
              className: `${childrenEl.props.className} slide-nexus-item`,
            }),
          )}
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
