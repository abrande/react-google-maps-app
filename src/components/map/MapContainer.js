import React from "react";
import MapSearchBox from "./SearchBox";
import Map from "./Map";
import _ from "lodash";

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            googleMapUrl: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
            bounds: null,
            markers: [],
            isMarkerShown: false,
            activeMarker: null,
            directions: null,
            currLatLng: {
                lat: 0,
                lng: 0
            },
            center: {
                lat: 0,
                lng: 0
            },
        };
    }

    componentDidMount() {
        this.showCurrentLocation();
    }

    onMapMounted = map => {
        this.map = map
    };

    onSearchBoxMounted = searchBox => {
        this.searchBox = searchBox;
    };

    onBoundsChanged = () => {
        this.setState({
            bounds: this.map.getBounds(),
            center: this.map.getCenter()
        });
    };

    showCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        currLatLng: {
                            ...prevState.currLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        isMarkerShown: true
                    }))
                }
            )
        } else {
            error => console.log(error)
        }
    };

    onPlacesChanged = () => {
        const places = this.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
            } else {
                bounds.extend(place.geometry.location)
            }
        });
        const nextMarkers = places.map(place => ({
            position: place.geometry.location,
            address: place.formatted_address,
            name: place.name,
            key: place.id,
            rating: place.rating,
            types: place.types
        }));
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
        this.setMarkerState(nextCenter, nextMarkers)
    };


    setMarkerState = (nextCenter, nextMarkers) => {
        this.setState({
            center: nextCenter,
            markers: nextMarkers,
        });
    };

    closeOtherMarkers = id => {
        this.setState({activeMarker: id});
    };

    getDirections = position => {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
            origin: new google.maps.LatLng({lat: this.state.currLatLng.lat, lng: this.state.currLatLng.lng}),
            destination: new google.maps.LatLng({lat: position.lat(), lng: position.lng()}),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({directions: result})
            } else {
                alert('Error Fetching Directions');
            }
        });
    };

    render() {
        const {
            currLatLng,
            bounds,
            googleMapUrl,
            isMarkerShown,
            activeMarker,
            directions,
            markers
        } = this.state;
        return (
            <div>
                <Map
                    googleMapURL={googleMapUrl}
                    onMapMounted={this.onMapMounted}
                    onBoundsChanged={this.onBoundsChanged}
                    isMarkerShown={isMarkerShown}
                    markers={markers}
                    closeOtherMarkers={this.closeOtherMarkers}
                    directions={directions}
                    getDirections={this.getDirections}
                    activeMarker={activeMarker}
                    currentLocation={{lat: currLatLng.lat, lng: currLatLng.lng}}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `100vh`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                >
                    <MapSearchBox
                        googleMapURL={googleMapUrl}
                        onSearchBoxMounted={this.onSearchBoxMounted}
                        bounds={bounds}
                        onPlacesChanged={this.onPlacesChanged}
                    />
                </Map>
            </div>
        )
    }

}

export default MapContainer;