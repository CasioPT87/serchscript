const Articles = require('./articles')
const Article = require('./article/index.tsx')
const LoginForm = require('./loginForm')
const ArticleForm = require('./articleForm')
const MainFrame = require('./mainFrame')
const Header = require('./header')
const Footer = require('./footer')
const Comments = require('./comments/index.tsx')
const ArticleLoad = require('./articleLoad')
const Paginator = require('./paginator')
const CheckBox = require('./checkbox')
const Warning = require('./warning')
const Searcher = require('./searcher')

module.exports = {
  Article,
  ArticleLoad,
  Articles,
  LoginForm,
  ArticleForm,
  MainFrame,
  Header,
  Footer,
  Comments,
  Paginator,
  CheckBox,
  Warning,
  Searcher,
}
