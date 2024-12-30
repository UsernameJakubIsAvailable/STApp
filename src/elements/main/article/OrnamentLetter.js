import A from "../../multimedia/alfabet/A.png";
import B from "../../multimedia/alfabet/B.png";
import C from "../../multimedia/alfabet/C.png";
import D from "../../multimedia/alfabet/D.png";
import E from "../../multimedia/alfabet/E.png";
import F from "../../multimedia/alfabet/F.png";
import G from "../../multimedia/alfabet/G.png";
import H from "../../multimedia/alfabet/H.png";
import I from "../../multimedia/alfabet/I.png";
import J from "../../multimedia/alfabet/J.png";
import K from "../../multimedia/alfabet/K.png";
import L from "../../multimedia/alfabet/L.png";
import Ł from "../../multimedia/alfabet/LY.png";
import M from "../../multimedia/alfabet/M.png";
import N from "../../multimedia/alfabet/N.png";
import O from "../../multimedia/alfabet/O.png";
import P from "../../multimedia/alfabet/P.png";
import R from "../../multimedia/alfabet/R.png";
import S from "../../multimedia/alfabet/S.png";
import T from "../../multimedia/alfabet/T.png";
import U from "../../multimedia/alfabet/U.png";
import W from "../../multimedia/alfabet/W.png";
import Z from "../../multimedia/alfabet/Z.png";

function OrnamentLetter(props) {
  const changeFirstLetterToOrnamentLetterImg = () => {
    const firstLetter = props.letter;
    const letterObject = {
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      Ł,
      M,
      N,
      O,
      P,
      R,
      S,
      T,
      U,
      W,
      Z,
    };
    return letterObject[firstLetter] ? (
      <img
        className="ornamentLetter"
        src={letterObject[firstLetter]}
        alt="ornamentLetter"
      />
    ) : (
      <span className="firstLetter">{firstLetter}</span>
    );
  };

  return <>{changeFirstLetterToOrnamentLetterImg()}</>;
}

export default OrnamentLetter;
