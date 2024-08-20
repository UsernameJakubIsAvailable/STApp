import swordIconBlue from "./multimedia/strzalka.png";
import swordIconRed from "./multimedia/strzalka.png";

function ArrowButton(props) {
  return (
    <div
      className={props.active ? "circle close swordIcon" : "swordIcon circle"}
    >
      <img
        src={swordIconBlue}
        alt="swordIcon"
        className={
          props.active ? `swordIcon swordITop close` : "swordIcon swordITop"
        }
      />
      <img
        src={swordIconRed}
        alt="swordIcon"
        className={
          props.active ? `swordIcon swordIMid close` : "swordIcon swordIMid"
        }
      />
      <img
        src={swordIconBlue}
        alt="swordIcon"
        className={
          props.active ? `swordIcon swordIBot close` : "swordIcon swordIBot"
        }
      />
    </div>
  );
}

export default ArrowButton;
