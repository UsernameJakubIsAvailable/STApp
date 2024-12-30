import ArticleNews from "./ArticleNews";

function Find(props) {
  const article = [
    {
      type: "RedusialParagraf",
      context: props.findContext,
    },
  ];

  return (
    <>
      <ArticleNews
        data={[
          {
            type: "RedusialParagraf",
            context: props.findContext,
          },
        ]}
      />
    </>
  );
}

export default Find;
