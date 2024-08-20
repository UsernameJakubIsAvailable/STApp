import { useEffect, useRef, useState } from "react";
import wstazka from "../elements/multimedia/wstazka1.png";

function MyCustomScroll(props) {
  const fatherElement = useRef("");
  const childElement = useRef("");
  const [childDistanceFromTop, setChildDistanceFromTop] = useState(0);
  const [childDistanceFromTopX, setChildDistanceFromTopX] = useState(0);

  const fatherElementHeight = useRef(0);

  const childElementHeight = useRef(0);

  const heightOfScrollingAreaRef = useRef(0);

  const myCustomScrollRef = useRef("");
  const scrollThumbRef = useRef("");

  const [fatherElementTopVisibleY, setFatherElementTopVisibleY] = useState("");

  const [mouseDownOnScrolingArea, setMouseDownOnScrolingArea] = useState(false);

  //useEfects setData
  useEffect(() => {
    fatherElement.current = document.getElementById(props.fatherSelector);
    childElement.current = document.getElementById(props.childSelector);
    if (fatherElement.current.getBoundingClientRect().top === 0) {
      setChildDistanceFromTop(childElement.current.offsetTop);
      setChildDistanceFromTopX(childElement.current.offsetTop);
    }

    setFatherElementTopVisibleY(fatherElement.current.scrollTop);

    heightOfScrollingAreaRef.current =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;

    fatherElementHeight.current =
      fatherElement.current.getBoundingClientRect().height;
    childElementHeight.current =
      childElement.current.getBoundingClientRect().height;
  }, []);

  //useEffects observe
  useEffect(() => {
    const heightObserv = new ResizeObserver((entries) => {
      if (
        childElement.current.getBoundingClientRect().height !==
        childElementHeight.current
      ) {
        updateStyleonResize();
      }
    });
    const obserwowany = childElement.current;
    heightObserv.observe(obserwowany, { contentRect: "height" });
    return () => heightObserv.unobserve(obserwowany, { contentRect: "height" });
  });

  //useEffects lisiners
  useEffect(() => {
    fatherElement.current.addEventListener("scroll", handleScroll);
    window.addEventListener("pointerup", handleMouseUpOnScrollingArea);
    window.addEventListener("pointermove", handleMoseMoveOnScrollingArea);
    window.addEventListener("resize", updateStyleonResize);

    return () => {
      fatherElement.current.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerup", handleMouseUpOnScrollingArea);
      window.removeEventListener("pointermove", handleMoseMoveOnScrollingArea);
      window.removeEventListener("resize", updateStyleonResize);
    };
  });

  //functions
  const handleScroll = () => {
    setFatherElementTopVisibleY(fatherElement.current.scrollTop);
  };

  const updateStyleonResize = (e) => {
    if (fatherElement.current.getBoundingClientRect().top === 0) {
      setChildDistanceFromTop(childElement.current.offsetTop);
      setChildDistanceFromTopX(childElement.current.offsetTop);
    }
    childElement.current = document.getElementById(props.childSelector);

    heightOfScrollingAreaRef.current =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;

    setFatherElementTopVisibleY(fatherElement.current.scrollTop);

    fatherElementHeight.current =
      fatherElement.current.getBoundingClientRect().height;

    childElementHeight.current =
      childElement.current.getBoundingClientRect().height;

    handleClickScroll();
  };

  const handleMoseDownOnScrollingArea = (e) => {
    setMouseDownOnScrolingArea(true);
    let yCordinateRelativeToScrollTumb =
      e.clientY - scrollThumbRef.current.getBoundingClientRect().top;
    // if (yCordinateRelativeToScrollTumb < 0) {
    //   yCordinateRelativeToScrollTumb = 0;
    // }

    const currentTopYVisibleValue =
      childElementHeight.current - fatherElementHeight.current;

    const heightOfScrollingArea =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;

    const newYValue =
      (yCordinateRelativeToScrollTumb * currentTopYVisibleValue) /
      heightOfScrollingArea;

    handleClickScroll(newYValue);
  };

  const handleMoseMoveOnScrollingArea = (e) => {
    if (mouseDownOnScrolingArea) {
      handleMoseDownOnScrollingArea(e);
    }
  };

  const handleMouseUpOnScrollingArea = () => {
    setMouseDownOnScrolingArea(false);
  };

  const handleClickScroll = (
    newYValue = fatherElementTopVisibleY,
    value = 0
  ) => {
    fatherElement.current.scrollTo(0, newYValue + value, "smooth");
  };
  return (
    <ul
      className="myCustomScroll"
      ref={myCustomScrollRef}
      style={{
        height: `${fatherElementHeight.current}px`,
      }}
    >
      <li
        ref={scrollThumbRef}
        onPointerDown={(e) => handleMoseDownOnScrollingArea(e)}
        className="scrollTumb"
        style={{
          top: `${childDistanceFromTop + childDistanceFromTop * 0.3}px`,
        }}
      >
        <div
          style={
            scrollThumbRef.current === ""
              ? {}
              : {
                  transform: `translate( 0, ${
                    heightOfScrollingAreaRef.current /
                    ((childElementHeight.current -
                      fatherElementHeight.current) /
                      fatherElementTopVisibleY)
                  }px)`,
                }
          }
        >
          <img src={wstazka} alt="wstazka" />
        </div>
      </li>
    </ul>
  );
}
export default MyCustomScroll;
