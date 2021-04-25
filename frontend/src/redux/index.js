import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  blacklist: ['tableConfig', 'form'],
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createCustomStore = (client, history) => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument({ history, client }),
      )
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

export default createCustomStore
