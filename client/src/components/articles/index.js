const React = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { fetchArticles } = require("../../store/async");

const Articles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  if (!articles || !articles.list?.length) dispatch(fetchArticles);

  return (
    <div>
      {articles.list.map((article) => {
        return (
          <div key={Math.random()} className="killo">
            {article.title}
          </div>
        );
      })}
    </div>
  );
};

module.exports = Articles;
