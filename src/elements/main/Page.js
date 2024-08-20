import { useEffect, useState } from "react";
import API_BASE_URL from "../../fetch/API_BASE_URL";
import transDataArticle from "../../fetch/transData/transDataArticle";
import transDataImageAndDescryption from "../../fetch/transData/transDataImageAndDescryption";
import ArticleHidden from "./article/ArticleHidden";

function Page(props) {
  // const [content, setContent] = useState();
  // const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   setIsLoaded(false);
  //   fetch(
  //     `${API_BASE_URL}/api/podstronies?populate[dynamic][populate][article][populate][image][fields][0]=url&populate[dynamic][populate][ImageAndDescryption][populate][image][fields][0]=url&filters[sciezka][$eq]=${props.path}`
  //   )
  //     .then((res) => res.json())
  //     .then((fetchetData) => {
  //       const transData = [];

  //       fetchetData.data[0].attributes.dynamic.map((element, index) => {
  //         transData.push([]);
  //         transData[index].push({
  //           title: element.title,
  //           showAndhide: element.showAndHide,
  //           id: element.id,
  //         });
  //         if (element.article.length > 0) {
  //           element.article.forEach((element) => {
  //             transDataArticle(element, index, transData);
  //           });
  //         }
  //         if (element.ImageAndDescryption.length > 0) {
  //           const data = [];
  //           element.ImageAndDescryption.forEach((element) => {
  //             transDataImageAndDescryption(element, index, data);
  //           });
  //           transData[index].push({
  //             context: data,
  //             type: "ImageAndDescryption",
  //           });
  //         }
  //       });
  //       setContent(transData);
  //       setIsLoaded(true);
  //     });
  // }, [props.path]);

  const transformData = () => {
    const transData = [];

    props.content.attributes.dynamic.map((element, index) => {
      transData.push([]);
      transData[index].push({
        title: element.title,
        showAndhide: element.showAndHide,
        id: element.id,
      });
      if (element.article.length > 0) {
        element.article.forEach((element) => {
          transDataArticle(element, index, transData);
        });
      }
      if (element.ImageAndDescryption.length > 0) {
        const data = [];
        element.ImageAndDescryption.forEach((element) => {
          transDataImageAndDescryption(element, index, data);
        });
        transData[index].push({
          context: data,
          type: "ImageAndDescryption",
        });
      }
    });
    return transData;
  };

  return (
    <>
      {transformData().map((article) => (
        <li className="articleLi page" key={article}>
          {" "}
          <ArticleHidden data={article} />
        </li>
      ))}
    </>
  );
}
export default Page;
