const React = require("react");
const { useSelector } = require("react-redux");

const Articles = () => {
  const articles = useSelector((state) => state.articles);
  return (
    <div>
      <div className="capitan">{articles[0].title}</div>
    </div>
  );
};

module.exports = Articles;
