import { combineReducers, createStore } from 'redux'
import userReducer from '../reducers/users'

const configureStore = () => {
    const store = createStore(combineReducers({
        users: userReducer
    }))
    return store
}

export default configureStore