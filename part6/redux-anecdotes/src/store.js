import { createStore ,combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReduser from './reducers/notificationReduser'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReduser
})


const store = createStore(reducer, composeWithDevTools())

export default store