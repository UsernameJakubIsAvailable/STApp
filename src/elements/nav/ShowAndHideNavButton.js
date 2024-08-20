import swordIconBlue from "../multimedia/strzalka.png";
import swordIconRed from "../multimedia/strzalka.png";

function ShowAndHideNavButton(props) {
  return (
    <button
      className={
        props.showOrHideNavbar
          ? `showAndHideNavButton close`
          : "showAndHideNavButton"
      }
      onClick={() => props.handleShowAndHideNavButton()}
    >
      <div
        className={
          props.showOrHideNavbar ? "circle close swordIcon" : "swordIcon circle"
        }
      >
        <img
          src={swordIconBlue}
          alt="swordIcon"
          className={
            props.showOrHideNavbar
              ? `swordIcon swordITop close`
              : "swordIcon swordITop"
          }
        />
        <img
          src={swordIconRed}
          alt="swordIcon"
          className={
            props.showOrHideNavbar
              ? `swordIcon swordIMid close`
              : "swordIcon swordIMid"
          }
        />
        <img
          src={swordIconBlue}
          alt="swordIcon"
          className={
            props.showOrHideNavbar
              ? `swordIcon swordIBot close`
              : "swordIcon swordIBot"
          }
        />
      </div>
    </button>
  );
}
export default ShowAndHideNavButton;
