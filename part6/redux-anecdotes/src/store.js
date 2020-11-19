import { createStore ,combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteServices from './services/anecdotes'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

anecdoteServices.getAll().then(anecdote =>
  anecdote.forEach(anecdotes => {
    store.dispatch({ type: 'NEW_ANECDOTES', data: anecdotes })
  })
)

export default store