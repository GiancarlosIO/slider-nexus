var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) { if (!REACT_ELEMENT_TYPE) { REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7; } var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = { children: void 0 }; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = new Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(Object(source)); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
import styled from 'styled-components';
var Container =
/*#__PURE__*/
styled.div.withConfig({
  componentId: "nd0u4t-0"
})(["\n  width: 100%;\n  overflow: hidden;\n"]);
var Inner =
/*#__PURE__*/
styled.div.withConfig({
  componentId: "nd0u4t-1"
})(["\n  display: flex;\n  flex-flow: row nowrap;\n  ", "\n\n  /* Remember, ie10 does not has 'touchmove', 'touchstart' and 'touchend' */\n  ", "\n"], function (props) {
  return !props.isTouch && "transition: transform 0.3s ease;";
}, function (props) {
  return props.msMaxTouchPoints && "\n    overflow-x: scroll;\n    overflow-y: hidden;\n\n    -ms-overflow-style: none;\n    /* Hides the scrollbar. */\n\n    -ms-scroll-chaining: none;\n    /* Prevents Metro from swiping to the next tab or app. */\n\n    scroll-snap-type: mandatory;\n    -ms-scroll-snap-type: mandatory;\n    /* Forces a snap scroll behavior on your images. */\n\n    -ms-scroll-snap-points-x: snapInterval(0%, 100%);\n    /* Defines the y and x intervals to snap to when scrolling. */\n  ";
});
/**
 * TODO: Add i10 support https://css-tricks.com/the-javascript-behind-touch-friendly-sliders/
 * ie10 does not have touch events :( https://css-tricks.com/the-javascript-behind-touch-friendly-sliders/
 */

var Slider = function Slider(_ref) {
  var children = _ref.children;
  var touchRef = React.useRef({
    startX: 0,
    moveX: 0
  }); // const visibleElementIndex = React.useRef<number>(0);

  var innerRef = React.useRef(null);
  var containerRef = React.useRef(null);
  var slideRef = React.useRef(null);

  var _React$useState = React.useState({
    containerWidth: 0,
    itemWidth: 0,
    gap: 0,
    msMaxTouchPoints: false
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      computedValues = _React$useState2[0],
      setComputedValues = _React$useState2[1]; // const [innerSliderWidth, setInnerSlider] = React.useState(0);


  var _React$useState3 = React.useState({
    currentIndex: 0,
    translateXValue: 0,
    isTouch: false
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      positionComputedValues = _React$useState4[0],
      setPositionComputedValues = _React$useState4[1]; // const [currentIndex, setCurrentIndex] = React.useState(0);


  var childrens = React.Children.toArray(children);

  var onNext = function onNext() {
    var visibleElments = Math.round(computedValues.containerWidth / computedValues.itemWidth);
    setPositionComputedValues(function (values) {
      /**
       * if we are showing multiples elements we need to reset the position if we are "showing" the last element
       * ---
       * Note that "showing" and "current" indexs are not the same
       * "Showing" index is the last element that is viewed in the slider
       * "Current" index is the index of the element tracked in the slider component itself
       */
      if (visibleElments > 1 && visibleElments + values.currentIndex >= children.length) {
        return {
          isTouch: false,
          currentIndex: 0,
          translateXValue: 0 * computedValues.itemWidth + 0 * computedValues.gap
        };
      }
      /**
       * If we are in the last slide, reset the index
       */


      if (values.currentIndex >= childrens.length - 1) {
        return {
          currentIndex: 0,
          isTouch: false,
          translateXValue: 0 * computedValues.itemWidth + 0 * computedValues.gap
        };
      }

      var currentIndex = values.currentIndex + 1;
      return {
        isTouch: false,
        currentIndex: currentIndex,
        translateXValue: currentIndex * computedValues.itemWidth + currentIndex * computedValues.gap
      };
    });
  };

  var onPrev = function onPrev() {
    if (positionComputedValues.currentIndex === 0) {
      return setPositionComputedValues({
        isTouch: false,
        currentIndex: 0,
        translateXValue: 0
      });
    }

    setPositionComputedValues(function (values) {
      var currentIndex = values.currentIndex - 1;
      return {
        isTouch: false,
        currentIndex: currentIndex,
        translateXValue: currentIndex * computedValues.itemWidth + currentIndex * computedValues.gap
      };
    });
  };

  React.useLayoutEffect(function () {
    // if (innerRef.current) {
    //   setInnerSlider(innerRef.current.getBoundingClientRect().width);
    // }
    if (containerRef.current && slideRef.current) {
      var itemMarginCSSRule = window.getComputedStyle(slideRef.current, 'slide-nexus-slide').getPropertyValue('margin').split(' ');
      var gap = parseInt((itemMarginCSSRule[1] || itemMarginCSSRule[3] || '0px').replace('px', ''), 10);
      setComputedValues({
        itemWidth: slideRef.current.getBoundingClientRect().width,
        containerWidth: containerRef.current.getBoundingClientRect().width,
        gap: gap,
        msMaxTouchPoints: Boolean(navigator.msMaxTouchPoints)
      });
    }
  }, []);

  var onTouchStart = function onTouchStart(event) {
    touchRef.current.startX = event.touches[0].pageX;
    setPositionComputedValues(_objectSpread({}, positionComputedValues, {
      isTouch: true
    }));
  };

  var onTouchMove = function onTouchMove(event) {
    touchRef.current.moveX = event.touches[0].pageX;
    var translateXValue = positionComputedValues.currentIndex * computedValues.itemWidth + positionComputedValues.currentIndex * computedValues.gap + (touchRef.current.startX - touchRef.current.moveX);
    setPositionComputedValues(_objectSpread({}, positionComputedValues, {
      translateXValue: translateXValue
    }));
  };

  var onTouchEnd = function onTouchEnd() {
    var lastTranslateXValue = positionComputedValues.currentIndex * computedValues.itemWidth + positionComputedValues.currentIndex * computedValues.gap;
    setPositionComputedValues(_objectSpread({}, positionComputedValues, {
      isTouch: true
    }));
    var panX = computedValues.itemWidth / 3;

    if (positionComputedValues.translateXValue > lastTranslateXValue + panX) {
      onNext();
    } else if (positionComputedValues.translateXValue + panX < lastTranslateXValue) {
      onPrev();
    } else {
      setPositionComputedValues(_objectSpread({}, positionComputedValues, {
        isTouch: false,
        translateXValue: lastTranslateXValue
      }));
    } // here we decide if we need to go to the next or prev slider

  }; // console.log({
  //   positionComputedValues,
  //   computedValues,
  // });

  /**
   * TODO: ADD CSS PREFIX TO TRAMSLATE CSS RULE
   *
   */


  var eventHandlers = computedValues.msMaxTouchPoints ? {} : {
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd
  };
  return _jsx("div", {}, void 0, React.createElement(Container, {
    ref: containerRef
  }, React.createElement(Inner, Object.assign({
    isTouch: positionComputedValues.isTouch,
    style: {
      transform: "translateX(".concat(positionComputedValues.translateXValue * -1, "px)")
    },
    msMaxTouchPoints: computedValues.msMaxTouchPoints
  }, eventHandlers, {
    ref: innerRef
  }), childrens.map(function (childrenEl) {
    return React.cloneElement(childrenEl, {
      ref: slideRef,
      className: "".concat(childrenEl.props.className, " slide-nexus-item")
    });
  }))), _jsx("div", {}, void 0, _jsx("button", {
    type: "button",
    onClick: onPrev
  }, void 0, "Prev"), _jsx("button", {
    type: "button",
    onClick: onNext
  }, void 0, "Next")));
};

export default Slider;
