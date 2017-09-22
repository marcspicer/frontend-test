export const REQUEST_LOCATION = 'REQUEST_LOCATION'
export const GET_LOCATION = 'GET_LOCATION'
export const INVALIDATE_LOCATION = 'INVALIDATE_LOCATION'

export const requestLocation = location => ({
  type: REQUEST_LOCATION,
  location
})

export const getLocation = location => ({
  type: GET_LOCATION,
  location
})

export const invalidateLocation = location => ({
  type: INVALIDATE_LOCATION,
  location
})


export const fetchLocation = location => (dispatch) => {
  dispatch(requestLocation(location))
  return dispatch(getLocation(location, {location: 'abc', lat:'33',lng:'-33'}));
}

// const fetchPosts = reddit => dispatch => {
//   dispatch(requestPosts(reddit))
//   return fetch(`https://www.reddit.com/r/${reddit}.json`)
//     .then(response => response.json())
//     .then(json => dispatch(receivePosts(reddit, json)))
// }
