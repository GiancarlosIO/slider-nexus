import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Inner = styled.div<{ isTouch?: boolean; msMaxTouchPoints: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  ${props => !props.isTouch && `transition: transform 0.3s ease;`}

  /* Remember, ie10 does not has 'touchmove', 'touchstart' and 'touchend' */
  ${props =>
    props.msMaxTouchPoints &&
    `
    overflow-x: scroll;
    overflow-y: hidden;

    -ms-overflow-style: none;
    /* Hides the scrollbar. */

    -ms-scroll-chaining: none;
    /* Prevents Metro from swiping to the next tab or app. */

    scroll-snap-type: mandatory;
    -ms-scroll-snap-type: mandatory;
    /* Forces a snap scroll behavior on your images. */

    -ms-scroll-snap-points-x: snapInterval(0%, 100%);
    /* Defines the y and x intervals to snap to when scrolling. */
  `}
`;

/**
 * TODO: Add i10 support https://css-tricks.com/the-javascript-behind-touch-friendly-sliders/
 * ie10 does not have touch events :( https://css-tricks.com/the-javascript-behind-touch-friendly-sliders/
 */

const Slider = ({ children }) => {
  const touchRef = React.useRef({
    startX: 0,
    moveX: 0,
  });
  // const visibleElementIndex = React.useRef<number>(0);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const slideRef = React.useRef<HTMLDivElement>(null);

  const [computedValues, setComputedValues] = React.useState({
    containerWidth: 0,
    itemWidth: 0,
    gap: 0,
    msMaxTouchPoints: false,
  });
  // const [innerSliderWidth, setInnerSlider] = React.useState(0);
  const [positionComputedValues, setPositionComputedValues] = React.useState<{
    currentIndex: number;
    translateXValue: number;
    isTouch?: boolean;
  }>({
    currentIndex: 0,
    translateXValue: 0,
    isTouch: false,
  });
  // const [currentIndex, setCurrentIndex] = React.useState(0);

  const childrens = React.Children.toArray(children);

  const onNext = () => {
    const visibleElments = Math.round(
      computedValues.containerWidth / computedValues.itemWidth,
    );

    setPositionComputedValues(values => {
      /**
       * if we are showing multiples elements we need to reset the position if we are "showing" the last element
       * ---
       * Note that "showing" and "current" indexs are not the same
       * "Showing" index is the last element that is viewed in the slider
       * "Current" index is the index of the element tracked in the slider component itself
       */
      if (
        visibleElments > 1 &&
        visibleElments + values.currentIndex >= children.length
      ) {
        return {
          isTouch: false,
          currentIndex: 0,
          translateXValue:
            0 * computedValues.itemWidth + 0 * computedValues.gap,
        };
      }

      /**
       * If we are in the last slide, reset the index
       */
      if (values.currentIndex >= childrens.length - 1) {
        return {
          currentIndex: 0,
          isTouch: false,
          translateXValue:
            0 * computedValues.itemWidth + 0 * computedValues.gap,
        };
      }

      const currentIndex = values.currentIndex + 1;

      return {
        isTouch: false,
        currentIndex,
        translateXValue:
          currentIndex * computedValues.itemWidth +
          currentIndex * computedValues.gap,
      };
    });
  };

  const onPrev = () => {
    if (positionComputedValues.currentIndex === 0) {
      return setPositionComputedValues({
        isTouch: false,
        currentIndex: 0,
        translateXValue: 0,
      });
    }
    setPositionComputedValues(values => {
      const currentIndex = values.currentIndex - 1;

      return {
        isTouch: false,
        currentIndex,
        translateXValue:
          currentIndex * computedValues.itemWidth +
          currentIndex * computedValues.gap,
      };
    });
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
        msMaxTouchPoints: navigator.msMaxTouchPoints,
      });
    }
  }, []);

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchRef.current.startX = event.touches[0].pageX;
    setPositionComputedValues({
      ...positionComputedValues,
      isTouch: true,
    });
    console.log({ touch: touchRef.current });
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchRef.current.moveX = event.touches[0].pageX;

    const translateXValue =
      positionComputedValues.currentIndex * computedValues.itemWidth +
      positionComputedValues.currentIndex * computedValues.gap +
      (touchRef.current.startX - touchRef.current.moveX);

    console.log({ touch: touchRef.current, translateXValue });

    setPositionComputedValues({
      ...positionComputedValues,
      translateXValue,
    });
  };

  const onTouchEnd = () => {
    const lastTranslateXValue =
      positionComputedValues.currentIndex * computedValues.itemWidth +
      positionComputedValues.currentIndex * computedValues.gap;

    setPositionComputedValues({ ...positionComputedValues, isTouch: true });
    const panX = computedValues.itemWidth / 3;

    if (positionComputedValues.translateXValue > lastTranslateXValue + panX) {
      console.log('next');

      onNext();
    } else if (
      positionComputedValues.translateXValue + panX <
      lastTranslateXValue
    ) {
      console.log('prev');
      onPrev();
    } else {
      setPositionComputedValues({
        ...positionComputedValues,
        isTouch: false,
        translateXValue: lastTranslateXValue,
      });
    }
    // here we decide if we need to go to the next or prev slider
  };

  // console.log({
  //   positionComputedValues,
  //   computedValues,
  // });

  /**
   * TODO: ADD CSS PREFIX TO TRAMSLATE CSS RULE
   *
   */

  const eventHandlers = computedValues.msMaxTouchPoints
    ? {}
    : {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
      };

  return (
    <div>
      <Container ref={containerRef}>
        <Inner
          isTouch={positionComputedValues.isTouch}
          style={{
            transform: `translateX(${positionComputedValues.translateXValue *
              -1}px)`,
          }}
          msMaxTouchPoints={computedValues.msMaxTouchPoints}
          {...eventHandlers}
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
