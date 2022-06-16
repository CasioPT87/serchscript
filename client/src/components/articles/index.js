const React = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { fetchArticles } = require('../../store/async')

const { useEffect } = React

const Articles = () => {
  const dispatch = useDispatch()
  const articles = useSelector(state => state.articles)
  console.log('articles alli', articles)
  console.log('pasa?', !articles?.list?.length)
  if (!articles || !articles.list?.length) dispatch(fetchArticles)

  return (
    <div>
      {articles.list.map((article) => {
        return <div key={Math.random()} className="killo">{article.title}</div>;
      })}
    </div>
  );
};

module.exports = Articles;
