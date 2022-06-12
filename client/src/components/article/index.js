const React = require("react");
const { useSelector } = require("react-redux");

const Articles = () => {
  const article = useSelector((state) => state.article);
  return (
    <div>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.content}</div>
    </div>
  );
};

module.exports = Articles;
