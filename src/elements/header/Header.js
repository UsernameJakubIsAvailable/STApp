import listki from '../multimedia/liscie-banner-prawy.png';
import logo from '../multimedia/banner-listopad.png';
import raiderHorse from '../multimedia/polnoc-jezdziec.png';
import raiderTomasz from '../multimedia/poludnie-jezdziec.png';





function Header() {
    return(
        <header>
            <img className='logo' alt='logo' src={logo}/>
            <img className='leaves l1' alt='leaves' src={listki}/>
            <img className='leaves l2' alt='leaves' src={listki}/>
            <img className='raiderN' alt='look at my horse my horse is amazing' src={raiderHorse}/>
            <img className='raiderS' alt='tomasz na koniu' src={raiderTomasz}/>

            
        </header>
    )
}
export default Header