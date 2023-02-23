import setUpStore = require('../setUp/index')
import defaultState = require('../state/index')

const unusedStore = setUpStore(defaultState)

type RequestParams = {
  pathParams?: any
  searchParams?: any
  formDataProps?: any
  data?: any
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = typeof defaultState
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof unusedStore.dispatch

export type { RequestParams }
