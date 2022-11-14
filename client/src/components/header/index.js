const { Link } = require("react-router-dom");

const React = require("react");

const Header = () => {
  return (
    <div class="menu cf">
      <Link to="/">Home</Link> | <Link to="/articles">Articles</Link> |{" "}
      <Link to="/admin/articles/new">new Article</Link> |{" "}
      <Link to="/auth">Auth</Link>
    </div>
  );
};

module.exports = Header;
