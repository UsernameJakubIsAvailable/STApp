import React from "react";


function CodeElement(props){

    return(
        <div className="codeElement">
        {React.createElement('div', { dangerouslySetInnerHTML: { __html: props.stringToCode } })}
        </div>
    )

}
export default CodeElement