import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore(initialState = {}, history) {
  // Compose final middleware and use devtools in debug environment
  const middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
  )

  // Create final store and subscribe router in debug env ie. for devtools
  let store = middleware(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
