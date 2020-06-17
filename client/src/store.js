import { createStore, applyMiddleware, compose } from 'redux'

import createSagaMiddleware from 'redux-saga'

import combineReducers from './rootReducers'
import sagas from './rootSagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers, compose(applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (fn) => fn));

sagaMiddleware.run(sagas)

export default store
