import swordIconBlue from "../multimedia/strzalka.png";
import swordIconRed from "../multimedia/strzalka.png";

function ShowAndHideNavButton(props) {
  return (
    <button
      className={
        props.showOrHideNavbar
          ? `showAndHideNavButton closeNav`
          : "showAndHideNavButton"
      }
      onClick={() => props.handleShowAndHideNavButton()}
    >
      <div
        className={
          props.showOrHideNavbar
            ? "circle closeNav swordIcon"
            : "swordIcon circle"
        }
      >
        <img
          src={swordIconBlue}
          alt="swordIcon"
          className={
            props.showOrHideNavbar
              ? `swordIcon swordITop closeNav`
              : "swordIcon swordITop"
          }
        />
        <img
          src={swordIconRed}
          alt="swordIcon"
          className={
            props.showOrHideNavbar
              ? `swordIcon swordIMid closeNav`
              : "swordIcon swordIMid"
          }
        />
        <img
          src={swordIconBlue}
          alt="swordIcon"
          className={
            props.showOrHideNavbar
              ? `swordIcon swordIBot closeNav`
              : "swordIcon swordIBot"
          }
        />
      </div>
    </button>
  );
}
export default ShowAndHideNavButton;
