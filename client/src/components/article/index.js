const React = require("react");
const { useSelector } = require("react-redux");

const Articles = () => {
  const articles = useSelector((state) => state.articles);
  return (
    <div>
      <div>{articles[1].title}</div>
    </div>
  );
};

module.exports = Articles;
