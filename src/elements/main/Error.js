import { useEffect } from "react";

function Error(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.back();
    }, 3000);
    return () => clearTimeout(timer);
  });
  return (
    <>
      <h2 className="mainArticle">UPS.. coś poszło nie tak</h2>
      <div className="timerBack" />
    </>
  );
}

export default Error;
