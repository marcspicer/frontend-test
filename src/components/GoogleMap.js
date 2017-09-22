import React, {Component} from 'react';
import GooglePlaces from './GooglePlaces';

class GoogleMap extends Component {
  constructor() {
    super();
    this.state = {map: null};
  }

  componentDidMount() {
    window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCQWDuUiF3yRiMCA2GOkJotdKp4VfvYFqE&libraries=geometry,places&callback=initMap')
  }

  initMap = () => {
      var mapDom = document.getElementById("g-map");
      const map = new google.maps.Map(mapDom, { center: {lat: -33.8688, lng: 151.2195},
          zoom: 13 });
      this.setState({
        map: map
      });
  }

  render() {
    const { map } = this.state
    return(
      <div>
        <GooglePlaces map={map}/>
        <div ref="map" className="gmap3" id="g-map"></div>
      </div>
    )
  }
}

export default GoogleMap;

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
