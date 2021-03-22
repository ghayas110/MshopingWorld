import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ads } from './ads'
import { categories } from './categories'
import { users } from './users'
import { favorites } from './favorites'
import { loggedInUser } from './loggedInUser'

export const configureStore = () => {
    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }

    const store = createStore(
        persistCombineReducers(config, {
            loggedInUser
        }),
        compose(
            applyMiddleware(thunk)
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()            
        )
    )
    const persistor = persistStore(store)
    return { persistor, store }
}