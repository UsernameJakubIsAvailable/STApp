import { useEffect, useState } from "react";
import strzalka from "../../multimedia/strzalka.png";
import API_BASE_URL from "../../../fetch/API_BASE_URL";

function Galery(props) {
  const [bigImg, setBigImg] = useState(null);

  const closeGalery = (e) => {
    if (e.key === "Escape") {
      setBigImg(null);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", (e) => closeGalery(e));

    return window.removeEventListener("keydown", (e) => closeGalery(e));
  });

  props.images.data.map((image) => image.attributes.url);
  const images = props.images.data.map(
    (image) => API_BASE_URL + image.attributes.url
  );
  const handleBigImg = (e, index) => {
    setBigImg(index);
  };
  const handleBigImgChange = (value) => {
    if (bigImg + value < 0) {
      setBigImg(images.length - 1);
    } else if (bigImg + value > images.length - 1) {
      setBigImg(0);
    } else {
      setBigImg(bigImg + value);
    }
  };
  return (
    <section className="galery">
      {images.map((image, index) => (
        <img
          loading="lazy"
          key={`galery element${image + index}`}
          alt={`galery element${index}`}
          className="galeryIMG"
          onClick={(e) => handleBigImg(e, index)}
          src={image}
        ></img>
      ))}
      {bigImg !== null ? (
        <div className="picked">
          <button className="galeryClose" onClick={() => setBigImg(null)}>
            X
          </button>
          {images.length > 1 && (
            <button
              className="galeryArrowLeft"
              onClick={() => handleBigImgChange(-1)}
            >
              <img alt="galery previus img arrow" src={strzalka}></img>
            </button>
          )}
          <img alt="full screan" className="bigIMG" src={images[bigImg]}></img>
          {images.length > 1 && (
            <button
              className="galeryArrowRight"
              onClick={() => handleBigImgChange(1)}
            >
              <img alt="galery next img arrow" src={strzalka}></img>
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
}
export default Galery;
