import { useState } from "react";

function Find(props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <article className={visible ? "visibleFind" : "hiddenFind"}>
        {props.findContext}
      </article>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "zwiń" : "czytaj dalej..."}
      </button>
    </>
  );
}

export default Find;
