import OrnamentLetter from "./OrnamentLetter"

function FirsParagraf(props) {


    return(<p>
        <OrnamentLetter letter={props.firstParagraf.slice(0, 1).toUpperCase() }/>
        {props.firstParagraf.slice(1,props.firstParagraf.length)
}
    </p>)
    
}

export default FirsParagraf