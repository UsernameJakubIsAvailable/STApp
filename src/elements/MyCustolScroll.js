import { useEffect, useRef, useState } from "react";
import wstazka from "../elements/multimedia/wstazka1.png";
import { isMobile } from "react-device-detect";

function MyCustomScroll(props) {
  const scrollingConteinerSelector = props.scrollingAreaSelector;
  const fatherSelector = props.fatherSelector;
  const childSelector = props.childSelector;

  const scrollingElement = useRef();
  const scrollingConteiner = useRef();
  const childElement = useRef();

  const fatherHeight = useRef(0);
  const childHeight = useRef(0);
  const conteinerHeight = useRef(0);

  const scrollThumbRef = useRef();
  const heightOfScrollingAreaRef = useRef(0);

  const extraSize = useRef(0);

  const scrollThumbVisible = useRef(false);

  const [yValue, setyValue] = useState(0);
  const [scrolThumbPosition, setScrolThumbPosition] = useState(0);

  const [mouseDownOnScrolingArea, setMouseDownOnScrolingArea] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleScroll = () => {
    setyValue(document.getElementById(fatherSelector).scrollTop);
  };
  const handleWindowScroll = () => {
    setyValue(window.pageYOffset);
  };

  // updating value on resize (call in observ useEffect) S
  const updateValuesResize = () => {
    // przeniesione, do testów S
    heightOfScrollingAreaRef.current =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;
    // przeniesione, do testów E

    if (props.extraSize) {
      const extraElements = document.querySelectorAll(`.${props.extraSize}`);
      extraElements.forEach((element) => {
        extraSize.current = element.getBoundingClientRect().height;
      });
    }
    const fatherSelectorHeight = document
      .getElementById(fatherSelector)
      .getBoundingClientRect().height;
    const childSelectorHeight = document
      .getElementById(childSelector)
      .getBoundingClientRect().height;
    const scrolingConteinerSelectorrHeight =
      childSelectorHeight +
      extraSize.current +
      (props.isWorkingOnWindow ? window.innerHeight - fatherSelectorHeight : 0);

    fatherHeight.current = fatherSelectorHeight;
    childHeight.current = childSelectorHeight;
    conteinerHeight.current = scrolingConteinerSelectorrHeight;
    scrollingConteiner.current.style.height = `${scrolingConteinerSelectorrHeight}px`;
    updateScrolThumbPostion();
  };

  const updateScrolThumbPostion = () => {
    if (childHeight.current < fatherHeight.current) {
      setScrolThumbPosition(0);
      return;
    }

    if (props.isWorkingOnWindow === true) {
      const precentOfScrolledElement = Math.round(
        (window.pageYOffset * 100) /
          (conteinerHeight.current - window.innerHeight)
      );

      // stary sposób liczenia na window:

      // (heightOfScrollingAreaRef.current * yValue) /
      // (conteinerHeight.current - fatherHeight.current) -

      const newScrollThumbPositon =
        (precentOfScrolledElement / 100) * heightOfScrollingAreaRef.current -
        25;
      setScrolThumbPosition(newScrollThumbPositon);
    } else {
      const newScrollThumbPositon =
        (heightOfScrollingAreaRef.current * yValue) /
          (childHeight.current - fatherHeight.current) -
        25;
      setScrolThumbPosition(newScrollThumbPositon);
    }
  };

  useEffect(() => {
    !isLoaded && setIsLoaded(true);
    scrollThumbVisible.current = true;

    setyValue(0);
  }, []);
  // updating value on resize (call in observ useEffect) E

  //useEffect 1render, setValues. S
  useEffect(() => {
    scrollingElement.current = document.getElementById(fatherSelector);
    scrollingConteiner.current = document.getElementById(
      scrollingConteinerSelector
    );
    childElement.current = document.getElementById(childSelector);
    scrollingConteiner.current = document.getElementById(
      scrollingConteinerSelector
    );
  }, []);
  //useEffect 1render, setValues. E

  // useEffect(() => {
  //   heightOfScrollingAreaRef.current =
  //     scrollThumbRef.current.getBoundingClientRect().height -
  //     scrollThumbRef.current.lastChild.getBoundingClientRect().height;
  // });

  //useEffect everyTime, eventsLisiner:scroll&click on scoll. S
  useEffect(() => {
    updateScrolThumbPostion();

    if (props.isWorkingOnWindow) {
      window.addEventListener("scroll", handleWindowScroll);
      window.addEventListener("resize", updateValuesResize);
    } else {
      document
        .getElementById(fatherSelector)
        .addEventListener("scroll", handleScroll);
    }
    window.addEventListener("pointerup", handleMouseUpOnScrollingArea);
    window.addEventListener("pointermove", handleMoseMoveOnScrollingArea);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", updateValuesResize);

      document
        .getElementById(fatherSelector)
        .removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerup", handleMouseUpOnScrollingArea);
      window.removeEventListener("pointermove", handleMoseMoveOnScrollingArea);
    };
  });
  //useEffect everyTime, observ events: scrol&click on scoll. E

  //useEffect render when yValue change, handle scroll and scrollThumbPosition S
  useEffect(() => {
    if (yValue > 0) {
      scrollingElement.current.scrollTo(0, yValue, "smooth");
    } else {
      scrollingElement.current.scrollTo(0, 0, "smooth");
    }
  }, [yValue]);
  //useEffect render when yValue change, handle scroll and scrollThumbPosition E

  //useEffect 1render, create observer s
  useEffect(() => {
    const heightObserv = new ResizeObserver(() => {
      if (
        childElement.current.getBoundingClientRect().height !==
        childHeight.current
      ) {
        updateValuesResize();
      }
    });
    const observe = childElement.current;
    heightObserv.observe(observe, { contentRect: "height" });
    return () => heightObserv.unobserve(observe, { contentRect: "height" });
  }, []);
  //useEffect 1render, create observer e

  // handle click on scroll S
  const handleMoseDownOnScrollingArea = (e) => {
    if (childHeight.current < fatherHeight.current) {
      return;
    }
    setMouseDownOnScrolingArea(true);

    const yCordinateRelativeToScrollTumb =
      e.clientY - scrollThumbRef.current.getBoundingClientRect().top;
    const currentTopYVisibleValue =
      (childHeight.current > fatherHeight.current
        ? childHeight.current - fatherHeight.current + extraSize.current
        : childHeight.current) + extraSize.current;
    const heightOfScrollingArea =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;
    const newYValue =
      (yCordinateRelativeToScrollTumb * currentTopYVisibleValue) /
      heightOfScrollingArea;
    if (newYValue >= 0 && newYValue <= currentTopYVisibleValue) {
      setyValue(newYValue);
      handleClickScroll(newYValue);
    } else if (newYValue < 0) {
      setyValue(0);
      handleClickScroll(0);
    } else if (newYValue > currentTopYVisibleValue) {
      setyValue(currentTopYVisibleValue);
      handleClickScroll(currentTopYVisibleValue);
    }
  };
  const handleMoseMoveOnScrollingArea = (e) => {
    if (mouseDownOnScrolingArea) {
      handleMoseDownOnScrollingArea(e);
    }
  };
  const handleMouseUpOnScrollingArea = (e) => {
    setMouseDownOnScrolingArea(false);
  };
  const handleClickScroll = (newYValue = yValue, value = 0) => {
    if (props.isWorkingOnWindow) {
      window.scrollTo(0, newYValue + value, "smooth");
    }
  };
  // handle click on scroll E

  return (
    <>
      <div
        style={{
          height: fatherHeight.current - extraSize.current - 50,
          top: 50,
        }}
        id={props.id}
        className={isMobile ? "myCustomScroll isMobile" : "myCustomScroll"}
      >
        <div
          ref={scrollThumbRef}
          onPointerDown={(e) => handleMoseDownOnScrollingArea(e)}
          className="scrollTumb"
        >
          <div
            style={
              scrollThumbRef.current === ""
                ? {}
                : { transform: `translate( 0, ${scrolThumbPosition}px)` }
            }
          >
            {isLoaded && (
              <img className="scrollIMG" src={wstazka} alt="scroll" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default MyCustomScroll;
