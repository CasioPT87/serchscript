const React = require("react");
const { useSelector } = require("react-redux");

const Articles = () => {
  const articles = useSelector((state) => {
    console.log('state', state)
    if (!state) return null
    return state.articles;
  })
  if (!articles) return null
  return (
    <div>
      {articles.map((article) => {
        return <div className="killo">{article.title}</div>;
      })}
    </div>
  );
};

module.exports = Articles;
