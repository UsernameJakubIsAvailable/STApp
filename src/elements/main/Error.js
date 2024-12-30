import { useEffect } from "react";

function Error(props) {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     props.back();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // });
  return (
    <div className="error">
      <h2 className="mainArticle">UPS.. coś poszło nie tak</h2>
      <p>
        jeśli mógłbym prosić wejdz na discord, znajdzi Jakuba i powiedz mu ze
        jest głąb oraz
      </p>
      <p>
        {props.content} {window.location.pathname.replace(/\//g, " 🢒 ")}
      </p>
    </div>
  );
}

export default Error;
