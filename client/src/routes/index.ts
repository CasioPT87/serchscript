export interface Route {
  path: string
  text: string
}

interface Routes {
  homeIcon: {
    src: string
    text: string
  }
  home: Route
  articles: {
    list: Route
    create: Route
  }
  auth: {
    login: Route
  }
}

const routes: Routes = {
  homeIcon: {
    src: '/images/logo.png',
    text: 'serchscript blog logo',
  },
  home: {
    path: '/',
    text: 'Home',
  },
  articles: {
    list: {
      path: '/',
      text: 'Articles List',
    },
    create: {
      path: '/admin/articles/new',
      text: 'New Article',
    },
  },
  auth: {
    login: {
      path: '/auth',
      text: 'Login',
    },
  },
}

module.exports = routes
