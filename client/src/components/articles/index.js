const React = require("react");
const { useSelector } = require("react-redux");
// const styles = require('./style.css')

const Articles = () => {
  const articles = useSelector((state) => state.articles);
  return (
    <div>
      {articles.map((article) => {
        return <div className="killo">{article.title}</div>;
      })}
    </div>
  );
};

module.exports = Articles;
