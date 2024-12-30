import API_BASE_URL from "../API_BASE_URL";

const transDataArticle = (element, index, transData) => {
  if (element.paragraf) {
    if (element.Ornament === "ZdobionaLitrera") {
      transData[index].push({
        type: "FirstParagraf",
        context: element.paragraf,
        style: element.stylCzcionki,
        fontSize: element.wielkoscCzcionki,
      });
    } else if (element.Ornament === "ZwyklyParagraf") {
      transData[index].push({
        type: "RedusialParagraf",
        context: element.paragraf,
        style: element.stylCzcionki,
        fontSize: element.wielkoscCzcionki,
      });
    }
    if (element.Ornament === "Tabela") {
      transData[index].push({
        type: "table",
        context: element.paragraf,
        style: element.stylCzcionki,
        fontSize: element.wielkoscCzcionki,
      });
    }
  }
  if (element.image.data) {
    // element.image.data.map((image) => API_BASE_URL + image.attributes.url);
    transData[index].push({
      type: "galery",
      context: element.image,
    });
  }
};
export default transDataArticle;
