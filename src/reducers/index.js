import { combineReducers } from 'redux'
import {
  REQUEST_LOCATION, GET_LOCATION, INVALIDATE_LOCATION
} from '../actions'

const location = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_LOCATION:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_LOCATION:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case GET_LOCATION:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.location,
      }
    default:
      return state
  }
}

const locationByGoogleMap = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_LOCATION:
    case GET_LOCATION:
    case REQUEST_LOCATION:
      return {
        ...state,
        [action.type]: location(state[action.location], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locationByGoogleMap
})

export default rootReducer
