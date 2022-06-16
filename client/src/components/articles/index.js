const React = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { fetchArticles } = require('../../store/async')

const { useEffect } = React

const Articles = () => {
  const articles = [] //useSelector(state => state.articles)
  useDispatch()(fetchArticles)

  return (
    <div>
      {articles.map((article) => {
        return <div key={Math.random()} className="killo">{article.title}</div>;
      })}
    </div>
  );
};

module.exports = Articles;
