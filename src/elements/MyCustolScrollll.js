// import { useEffect, useRef, useState } from "react";
// import wstazka from "../elements/multimedia/wstazka1.png";
// import { isMobile } from "react-device-detect";

// function MyCustomScroll(props) {
//   const fatherElement = useRef("");
//   const childElement = useRef("");
//   const [childDistanceFromTop, setChildDistanceFromTop] = useState(0);
//   const [childDistanceFromTopX, setChildDistanceFromTopX] = useState(0);

//   const fatherElementHeight = useRef(0);

//   const childElementHeight = useRef(0);

//   const heightOfScrollingAreaRef = useRef(0);

//   const myCustomScrollRef = useRef("");
//   const scrollThumbRef = useRef("");

//   const [fatherElementTopVisibleY, setFatherElementTopVisibleY] = useState("");

//   const [mouseDownOnScrolingArea, setMouseDownOnScrolingArea] = useState(false);

//   //useEfects setData
//   useEffect(() => {
//     fatherElement.current = document.getElementById(props.fatherSelector);
//     childElement.current = document.getElementById(props.childSelector);
//     if (fatherElement.current.getBoundingClientRect().top === 0) {
//       setChildDistanceFromTop(childElement.current.offsetTop);
//       setChildDistanceFromTopX(childElement.current.offsetTop);
//     }

//     setFatherElementTopVisibleY(fatherElement.current.scrollTop);

//     heightOfScrollingAreaRef.current =
//       scrollThumbRef.current.getBoundingClientRect().height -
//       scrollThumbRef.current.lastChild.getBoundingClientRect().height;

//     fatherElementHeight.current =
//       fatherElement.current.getBoundingClientRect().height;
//     childElementHeight.current =
//       childElement.current.getBoundingClientRect().height;
//   }, []);

//   //useEffects observe
//   useEffect(() => {
//     const heightObserv = new ResizeObserver((entries) => {
//       if (
//         childElement.current.getBoundingClientRect().height !==
//         childElementHeight.current
//       ) {
//         updateStyleonResize();
//       }
//     });
//     const obserwowany = childElement.current;
//     heightObserv.observe(obserwowany, { contentRect: "height" });
//     return () => heightObserv.unobserve(obserwowany, { contentRect: "height" });
//   });

//   //useEffects lisiners
//   useEffect(() => {
//     fatherElement.current.addEventListener("scroll", handleScroll);
//     window.addEventListener("pointerup", handleMouseUpOnScrollingArea);
//     window.addEventListener("pointermove", handleMoseMoveOnScrollingArea);
//     window.addEventListener("resize", updateStyleonResize);

//     return () => {
//       fatherElement.current.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("pointerup", handleMouseUpOnScrollingArea);
//       window.removeEventListener("pointermove", handleMoseMoveOnScrollingArea);
//       window.removeEventListener("resize", updateStyleonResize);
//     };
//   });

//   //functions
//   const handleScroll = () => {
//     setFatherElementTopVisibleY(fatherElement.current.scrollTop);
//   };

//   const updateStyleonResize = (e) => {
//     if (fatherElement.current.getBoundingClientRect().top === 0) {
//       setChildDistanceFromTop(childElement.current.offsetTop);
//       setChildDistanceFromTopX(childElement.current.offsetTop);
//     }
//     childElement.current = document.getElementById(props.childSelector);

//     heightOfScrollingAreaRef.current =
//       scrollThumbRef.current.getBoundingClientRect().height -
//       scrollThumbRef.current.lastChild.getBoundingClientRect().height;

//     setFatherElementTopVisibleY(fatherElement.current.scrollTop);

//     fatherElementHeight.current =
//       fatherElement.current.getBoundingClientRect().height;

//     childElementHeight.current =
//       childElement.current.getBoundingClientRect().height;

//     handleClickScroll();
//   };

//   const handleMoseDownOnScrollingArea = (e) => {
//     setMouseDownOnScrolingArea(true);
//     let yCordinateRelativeToScrollTumb =
//       e.clientY - scrollThumbRef.current.getBoundingClientRect().top;
//     // if (yCordinateRelativeToScrollTumb < 0) {
//     //   yCordinateRelativeToScrollTumb = 0;
//     // }

//     const currentTopYVisibleValue =
//       childElementHeight.current - fatherElementHeight.current;

//     const heightOfScrollingArea =
//       scrollThumbRef.current.getBoundingClientRect().height -
//       scrollThumbRef.current.lastChild.getBoundingClientRect().height;

//     const newYValue =
//       (yCordinateRelativeToScrollTumb * currentTopYVisibleValue) /
//       heightOfScrollingArea;

//     handleClickScroll(newYValue);
//   };

//   const handleMoseMoveOnScrollingArea = (e) => {
//     if (mouseDownOnScrolingArea) {
//       handleMoseDownOnScrollingArea(e);
//     }
//   };

//   const handleMouseUpOnScrollingArea = () => {
//     setMouseDownOnScrolingArea(false);
//   };

//   const handleClickScroll = (
//     newYValue = fatherElementTopVisibleY,
//     value = 0
//   ) => {
//     fatherElement.current.scrollTo(0, newYValue + value, "smooth");
//   };
//   return (
//     <ul
//       className={isMobile ? "myCustomScroll isMobile" : "myCustomScroll"}
//       ref={myCustomScrollRef}
//       style={{
//         height: `${fatherElementHeight.current}px`,
//       }}
//     >
//       <li
//         ref={scrollThumbRef}
//         onPointerDown={(e) => handleMoseDownOnScrollingArea(e)}
//         className="scrollTumb"
//         style={{
//           top: `${childDistanceFromTop + childDistanceFromTop * 0.3}px`,
//         }}
//       >
//         <div
//           style={
//             scrollThumbRef.current === ""
//               ? {}
//               : {
//                   transform: `translate( 0, ${
//                     heightOfScrollingAreaRef.current /
//                     ((childElementHeight.current -
//                       fatherElementHeight.current) /
//                       fatherElementTopVisibleY)
//                   }px)`,
//                 }
//           }
//         >
//           <img draggable="false" src={wstazka} alt="wstazka" />
//         </div>
//       </li>
//     </ul>
//   );
// }
// export default MyCustomScroll;
import { useEffect, useRef, useState } from "react";
import wstazka from "../elements/multimedia/wstazka1.png";
import { isMobile } from "react-device-detect";

function MyCustomScroll(props) {
  const scrollingConteinerSelector = props.scrollingAreaSelector;
  const fatherSelector = props.fatherSelector;
  const childSelector = props.childSelector;

  const scrollingElement = useRef();
  // const scrollingArea = useRef();
  const scrollingConteiner = useRef();

  const yMaxValueFatherSelector = useRef(0);
  const yMaxValueChildSelector = useRef(0);
  const yMaxScrollingConteinerSelector = useRef(0);

  const scrollThumbRef = useRef();
  const heightOfScrollingAreaRef = useRef(0);

  const extraSize = useRef(0);

  const [yValue, setyValue] = useState(0);
  const [mouseDownOnScrolingArea, setMouseDownOnScrolingArea] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleScroll = () => {
    setyValue(document.getElementById(fatherSelector).scrollTop);
  };
  const handleWindowScroll = () => {
    setyValue(window.pageYOffset);
  };

  const updateValuesResize = () => {
    if (props.extraSize) {
      const extraElements = document.querySelectorAll(`.${props.extraSize}`);
      extraElements.forEach((element) => {
        extraSize.current = element.getBoundingClientRect().height;
      });
    }
    yMaxValueFatherSelector.current = document
      .getElementById(fatherSelector)
      .getBoundingClientRect().height;
    yMaxValueChildSelector.current = document
      .getElementById(childSelector)
      .getBoundingClientRect().height;
    yMaxScrollingConteinerSelector.current =
      yMaxValueChildSelector.current +
      extraSize.current +
      (props.isWorkingOnWindow
        ? window.innerHeight - yMaxValueFatherSelector.current
        : 0);
    scrollingConteiner.current.style.height = `${yMaxScrollingConteinerSelector.current}px`;
  };

  useEffect(() => {
    setIsLoaded(true);
    setyValue(0);
  }, []);

  useEffect(() => {
    scrollingElement.current = document.getElementById(fatherSelector);
    scrollingConteiner.current = document.getElementById(
      scrollingConteinerSelector
    );

    scrollingConteiner.current = document.getElementById(
      scrollingConteinerSelector
    );
    updateValuesResize();

    // window.addEventListener("resize", updateValuesOnMountAndResize);
    // return () => {
    //   window.removeEventListener("resize", updateValuesOnMountAndResize);
    // };
  });

  useEffect(() => {
    // ustawia wysokość pola
    heightOfScrollingAreaRef.current =
      scrollThumbRef.current.getBoundingClientRect().height -
      scrollThumbRef.current.lastChild.getBoundingClientRect().height;
  });
  useEffect(() => {
    // dodano 1.12 S
    // bierze udział w zmienie pozycje wstązki o % zmian window.pageYOffset
    if (props.isWorkingOnWindow) {
      window.addEventListener("scroll", handleWindowScroll);
    } else {
      document
        .getElementById(fatherSelector)
        .addEventListener("scroll", handleScroll);
    }
    // dodano 1.12 E

    // Obsługa klinięcia w wstążkę S
    // document
    //   .getElementById(fatherSelector)
    //   .addEventListener("scroll", handleScroll);
    window.addEventListener("pointerup", handleMouseUpOnScrollingArea);
    window.addEventListener("pointermove", handleMoseMoveOnScrollingArea);
    // Obsługa klinięcia w wstążkę E

    // usunięcie lisnerów (konieczne) S
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      document
        .getElementById(fatherSelector)
        .removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerup", handleMouseUpOnScrollingArea);
      window.removeEventListener("pointermove", handleMoseMoveOnScrollingArea);
    };
    // usunięcie lisnerów (konieczne) E
  });

  useEffect(() => {
    if (yValue > 0) {
      scrollingElement.current.scrollTo(0, yValue, "smooth");
    } else {
      scrollingElement.current.scrollTo(0, 0, "smooth");
    }
  }, [yValue]);

  const handleMoseDownOnScrollingArea = (e) => {
    // if (yMaxValueChildSelector.current < yMaxValueFatherSelector.current) {
    //   return;
    // }
    setMouseDownOnScrolingArea(true);
    console.log(
      yValue,
      yMaxValueChildSelector.current +
        extraSize.current -
        yMaxValueFatherSelector.current,
      yMaxScrollingConteinerSelector.current +
        extraSize.current -
        yMaxValueFatherSelector.current,
      yMaxValueFatherSelector.current,
      yMaxScrollingConteinerSelector.current
    );
    const yCordinateRelativeToScrollTumb =
      e.clientY - scrollThumbRef.current.getBoundingClientRect().top;
    const currentTopYVisibleValue =
      (yMaxValueChildSelector.current > yMaxValueFatherSelector.current
        ? yMaxValueChildSelector.current -
          yMaxValueFatherSelector.current +
          extraSize.current
        : yMaxValueChildSelector.current) + extraSize.current;
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
    // scrollingElement.current.scrollTo(0, newYValue + value, "smooth");
    if (props.isWorkingOnWindow) {
      window.scrollTo(0, newYValue + value, "smooth");
    }
  };
  const getStyleScollTumb = () => {
    if (yMaxValueChildSelector.current < yMaxValueFatherSelector.current) {
      return;
    }
    if (props.isWorkingOnWindow) {
      return {
        transform: `translate( 0, ${
          (heightOfScrollingAreaRef.current * yValue) /
            (yMaxScrollingConteinerSelector.current -
              yMaxValueFatherSelector.current) -
          25
        }px)`,
      };
    } else {
      return {
        transform: `translate( 0, ${
          (heightOfScrollingAreaRef.current * yValue) /
            (yMaxValueChildSelector.current - yMaxValueFatherSelector.current) -
          25
        }px)`,
      };
    }
    // if (
    //   (yValue * 100) /
    //     (yMaxValueChildSelector.current - yMaxValueFatherSelector.current) <
    //   105
    // ) {
    //   return yMaxValueChildSelector.current - yMaxValueFatherSelector.current;
    // }
    //   yMaxScrollingConteinerSelector.current -
    // yMaxValueFatherSelector.current -
    // window.innerHeight * 0.2,
  };
  const styleScrollThumb = getStyleScollTumb();
  // transform: `translate( 0, ${
  //   (heightOfScrollingAreaRef.current * yValue) /
  //     (yMaxValueChildSelector.current > yMaxValueFatherSelector.current
  //       ? yMaxValueChildSelector.current - yMaxValueFatherSelector.current
  //       : yMaxValueChildSelector.current) -
  //   25
  // }px)`,

  return (
    <>
      <div
        style={{
          height: yMaxValueFatherSelector.current - extraSize.current,
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
          <div style={scrollThumbRef.current === "" ? {} : styleScrollThumb}>
            {isLoaded && <img src={wstazka} alt="aa" />}
          </div>
        </div>
      </div>
    </>
  );
}
export default MyCustomScroll;
