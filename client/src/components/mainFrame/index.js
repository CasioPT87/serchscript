const React = require("react");

const MainFrameComponent = (props) => {
  return <div className="Root">{props.children}</div>;
};

module.exports = MainFrameComponent;
