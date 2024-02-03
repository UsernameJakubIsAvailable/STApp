import { useEffect, useRef, useState, useNavigation } from "react";
import wstazka from "../elements/multimedia/wstazka1.png";

function MyCustomScroll(props) {
  //test
  const navigate = useNavigation;
  // console.log(navigate);
  // //zmienne
  const fatherElement = useRef("");
  const childElement = useRef("");

  const [fatherElementS, setFatherElementS] = useState("");
  const [childElementS, setChildElementS] = useState("");

  const fatherElementHeight = useRef(0);

  const childElementHeight = useRef(0);

  const heightOfScrollingAreaRef = useRef(0);

  const myCustomScrollRef = useRef("");
  const scrollThumbRef = useRef("");

  const [fatherElementTopVisibleY, setFatherElementTopVisibleY] = useState("");

  const [mouseDownOnScrolingArea, setMouseDownOnScrolingArea] = useState(false);

  //useEfects setData
  useEffect(() => {
    const father = document.getElementById(props.fatherSelector);
    const child = document.getElementById(props.childSelector);
    setFatherElementS(father);
    setChildElementS(child);
    fatherElement.current = document.getElementById(props.fatherSelector);
    childElement.current = document.getElementById(props.childSelector);
    roundFatherElementTopVisibleY(fatherElement.current.scrollTop);

    heightOfScrollingAreaRef.current =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;

    fatherElementHeight.current =
      fatherElement.current.getBoundingClientRect().height;
    childElementHeight.current =
      childElement.current.getBoundingClientRect().height;
  });
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
    childElement.current.addEventListener("resize", updateStyleonResize);
    window.addEventListener("pointerup", handleMouseUpOnScrollingArea);
    window.addEventListener("pointermove", handleMoseMoveOnScrollingArea);
    window.addEventListener("resize", updateStyleonResize);

    return () => {
      fatherElement.current.removeEventListener("scroll", handleScroll);
      childElement.current.removeEventListener("resize", updateStyleonResize);
      window.removeEventListener("pointerup", handleMouseUpOnScrollingArea);
      window.removeEventListener("pointermove", handleMoseMoveOnScrollingArea);
      window.removeEventListener("resize", updateStyleonResize);
    };
  });
  //functions
  const roundFatherElementTopVisibleY = (newYvalue) => {
    setFatherElementTopVisibleY(newYvalue);
  };
  const handleScroll = () => {
    roundFatherElementTopVisibleY(fatherElement.current.scrollTop);
  };
  const updateStyleonResize = (e) => {
    console.log("resize");
    childElement.current = document.getElementById(props.childSelector);

    heightOfScrollingAreaRef.current =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;

    roundFatherElementTopVisibleY(fatherElement.current.scrollTop);

    fatherElementHeight.current =
      fatherElement.current.getBoundingClientRect().height;

    childElementHeight.current =
      childElement.current.getBoundingClientRect().height;

    handleClickScroll();
  };
  const handleMoseDownOnScrollingArea = (e) => {
    setMouseDownOnScrolingArea(true);
    const yCordinateRelativeToScrollTumb =
      e.clientY - scrollThumbRef.current.getBoundingClientRect().top;

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
  const styleScrollThumb = {
    transform: `translate( 0, ${
      heightOfScrollingAreaRef.current /
      ((childElementHeight.current - fatherElementHeight.current) /
        fatherElementTopVisibleY)
    }px)`,
  };
  const styleScrollThumbRef = useRef({
    transform: `translate( 0, ${
      heightOfScrollingAreaRef.current /
      ((childElementHeight.current - fatherElementHeight.current) /
        fatherElementTopVisibleY)
    }px)`,
  });
  return (
    <ul
      className="myCustomScroll"
      ref={myCustomScrollRef}
      style={{ height: `${fatherElementHeight.current}px` }}
    >
      <li
        ref={scrollThumbRef}
        onPointerDown={(e) => handleMoseDownOnScrollingArea(e)}
        className="scrollTumb"
      >
        {console.log(
          heightOfScrollingAreaRef.current,
          childElementHeight.current,
          fatherElementHeight.current,
          fatherElementTopVisibleY
        )}
        {console.log(styleScrollThumb)}
        {console.log(
          heightOfScrollingAreaRef.current /
            ((childElementHeight.current - fatherElementHeight.current) /
              fatherElementTopVisibleY)
        )}

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
