import React, {Component} from 'react';

class GooglePlaces extends Component {
  constructor() {
    super();
    this.state = {distance: null}
    this.directionsService = null;
    this.directionsDisplay = null;
  }

  componentWillReceiveProps = (nextProps) => {
    const { map } = nextProps;
    if(map) {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
      });
      this.directionsDisplay.setMap(map);
      this.directionsDisplay.addListener('directions_changed', () => {
        this.computeTotalDistance(this.directionsDisplay.getDirections());
      });
      const addresses = { address1: {}, address2: {} };
      const searchBoxArray = Object.keys(addresses).map((key) => {
        const address = addresses[`${key}`];
        const _elem = document.getElementById(`${key}`);
        let _marker = {};
        const _searchBox = new google.maps.places.SearchBox(_elem);
        address.elem = _elem;
        address.marker = _marker;
        address.searchBox = _searchBox;

        return address;
      });
      map.addListener('bounds_changed', function(){
        searchBoxArray.map((elem) => {
          elem.searchBox.setBounds(map.getBounds());
        });
      })

      searchBoxArray.map((elem) => {
        elem.searchBox.addListener('places_changed', () => {
          const places = elem.searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          if (Object.keys(elem.marker).length > 0) {
            elem.marker.setMap(null);
          }
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }

            // Create a marker for each place.
            elem.marker = (new google.maps.Marker({
              map: map,
              title: place.name,
              draggable: true,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });

          if(Object.keys(searchBoxArray[0].marker).length > 0 && Object.keys(searchBoxArray[1].marker).length>0){
            console.log('Call Service');
            const origin = new google.maps.LatLng(searchBoxArray[0].marker.position.lat(), searchBoxArray[0].marker.position.lng());
            const destination = new google.maps.LatLng(searchBoxArray[1].marker.position.lat(), searchBoxArray[1].marker.position.lng());
            this.calculateAndDisplayRoute(origin, destination, searchBoxArray);
          }
          map.fitBounds(bounds);
        });
        return elem;
      });
    }
  }

  computeTotalDistance = (result) => {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    this.setState({
      distance: total
    })

  }

  calculateAndDisplayRoute = (origin, destination, searchBoxArray) => {
    this.directionsService.route({
      origin: origin,
      destination: destination,
      provideRouteAlternatives: true,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        searchBoxArray[0].marker.setMap(null);
        searchBoxArray[1].marker.setMap(null);
        const {map} = this.props;
        //for (var i = 0, len = response.routes.length; i < len; i++) {
              this.directionsDisplay.setDirections(response);
          //}
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  render() {
    const {map} = this.props;
    const {distance} = this.state;
    return(
      <div className="container">

  			<div className="row">
  					<div className="form-field">
  						<input type="text" placeholder="Address 1" id="address1" />
  					</div>
  					<div className="form-field">
  						<input type="text" placeholder="Address 2" id="address2" />
  					</div>
  					<div className="clearfix"></div>
  			</div>
        <div className="row">
          {distance ? <p>Distance between two points is<strong> {distance} km</strong></p> : ''}
        </div>

  		</div>
    )
  }
}

export default GooglePlaces;
