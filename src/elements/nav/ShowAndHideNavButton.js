import swordIconBlue from '../multimedia/sword-bluev3.png'
import swordIconRed from '../multimedia/sword-redv3.png'


function ShowAndHideNavButton(props) {
  return (
        <button className={props.showOrHideNavbar ? `showAndHideNavButton closeNav` : 'showAndHideNavButton'} onClick={()=>props.handleShowAndHideNavButton()}>
        <img src={swordIconBlue} alt='swordIcon' className={props.showOrHideNavbar ? `swordIcon swordITop closeNav` : 'swordIcon swordITop'}/>
        <img src={swordIconRed} alt='swordIcon' className={props.showOrHideNavbar ? `swordIcon swordIMid closeNav` : 'swordIcon swordIMid'}/>
        <img src={swordIconBlue} alt='swordIcon' className={props.showOrHideNavbar ? `swordIcon swordIBot closeNav` : 'swordIcon swordIBot'}/>
        </button>
  );
}
export default ShowAndHideNavButton;