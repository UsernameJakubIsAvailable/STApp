import listki from '../multimedia/listki.png';
import logo from '../multimedia/Logo.png';
import S from '../multimedia/SfromST.png'
import T from '../multimedia/TformST.png'



function Header() {
    return(
        <header>
            <img className='logo' alt='logo' src={logo}/>
            <img className='leaves l1' alt='leaves' src={listki}/>
            <img className='leaves l2' alt='leaves' src={listki}/>
            <div className='letterContein'>
                {/* <img className='letterS letter' alt='leaves' src={S}/>
                <img className='letterT letter' alt='leaves' src={T}/> */}
                ffd770
            </div>
        </header>
    )
}
export default Header