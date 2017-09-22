import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchLocation } from '../actions'
import GoogleMap from '../components/GoogleMap'

class App extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  // componentDidMount() {
  //   const { dispatch } = this.props
  //   dispatch(fetchLocation("Tronto ON canada"))
  // }

  render() {
    console.log(this.props);
    return (
      <div className="wrapper">
        <GoogleMap />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const { fetchLocation } = state
  const {
    isFetching,
    location: location
  } =  {
    isFetching: true,
    location: {}
  }

  return {
    location,
    isFetching,
  }
}

export default connect(mapStateToProps)(App)
