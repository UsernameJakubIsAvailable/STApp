import { useState } from "react";
import strzalka from '../multimedia/strzalka.png'

function TestElement(props) {

    const [visableSection , setVisableSection]=useState('false')
    const handleVisableSection = ()=>{
        setVisableSection(!visableSection)
    }
    const farherName = props.farherName+props.name

  return (
   <li key={props.name} className="navElement navElementRedBorder">
        <button className='visableSectionButton' onClick={()=>handleVisableSection()}>
                {props.name}
                <img className='arrow' style={visableSection?{transform:'rotate(180deg)'}:{ transform:'rotate(90deg)'}} alt='strzalka' src={strzalka}></img>
        </button>
        <ul style={visableSection?{display:'none'}:null}>
            {props.data.map(element=>props.creteElements(element , farherName))}
        </ul>
   </li>
  );
}
export default TestElement;