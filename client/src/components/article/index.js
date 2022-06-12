const React = require("react");
const { useSelector } = require("react-redux");

const Articles = () => {
  const article = useSelector((state) => {
    console.log('state', state)
    if (!state) return null
    return state.article;
  })
  if (!article) return null
  return (
    <div>
      <div className="capitan">{article.title}</div>
      <div className="capitan">{article.content}</div>
    </div>
  );
};

module.exports = Articles;
