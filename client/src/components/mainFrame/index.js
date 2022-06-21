const React = require("react");

const MainFrame = (props) => {
  return (
    <div class="container">
      <header class="header">Header</header>
      <div class="content-body">
        <main class="content">Content</main>
        <nav class="sidenav">Nav</nav>
        <aside class="ads">Ads</aside>
      </div>
      <footer class="footer">Footer</footer>
    </div>
  );
};

module.exports = MainFrame;
