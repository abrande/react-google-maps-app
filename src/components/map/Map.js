import React from "react";
import PropTypes from "prop-types";
import {DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs, TrafficLayer} from "react-google-maps";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";
const {MarkerWithLabel} = require("react-google-maps/lib/components/addons/MarkerWithLabel");


const Map = withScriptjs(withGoogleMap((props) => {
    const markers = props.markers.map((markers) => {
        return (
            <MarkerWithInfoWindow
                id={markers.key}
                position={markers.position}
                name={markers.name}
                address={markers.address}
                rating={markers.rating}
                closeOtherMarkers={props.closeOtherMarkers}
                activeMarker={markers.key === props.activeMarker}
                getDirections={props.getDirections}
            />
        )
    });

    return (
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={12}
            defaultCenter={{lat: props.currentLocation.lat, lng: props.currentLocation.lng}}
            onBoundsChanged={props.onBoundsChanged}
            onIdle={props.onBoundsChanged}
        >
            {props.isMarkerShown &&
            <MarkerWithLabel
                position={{lat: props.currentLocation.lat, lng: props.currentLocation.lng}}
                labelAnchor={new google.maps.Point(0, 0)}
                labelStyle={{backgroundColor: "yellow", fontSize: "9px", padding: "5px"}}
            >
                <div>Current Location</div>
            </MarkerWithLabel>}
            {props.directions && <DirectionsRenderer directions={props.directions} />}
            {markers}
            {props.children}
            <TrafficLayer autoUpdate/>
        </GoogleMap>
    )
}));

Map.propTypes = {
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string,
            key: PropTypes.string,
            name: PropTypes.string,
            rating: PropTypes.number,
            type: PropTypes.array,
            position: PropTypes.object.isRequired
        })
    ),

};

export default Map;