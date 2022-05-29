const React = require("react");

const RootComponent = (props) => {
  return <div className="Root">{props.children}</div>;
};

module.exports = RootComponent;
