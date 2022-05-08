const React = require("react");
const { useSelector } = require("react-redux");

const Articles = () => {
  const articles = useSelector((state) => state.articles);
  return (
    <div>
      {articles.map((article) => {
        return <div>{article.title}</div>;
      })}
    </div>
  );
};

module.exports = Articles;
