import React from "react";
import PropTypes from "prop-types";
import {SearchBox} from "react-google-maps/lib/components/places/SearchBox";
const google = window.google;

class MapSearchBox extends React.Component {
    render() {
        return (
            <SearchBox
                ref={this.props.onSearchBoxMounted}
                bounds={this.props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={this.props.onPlacesChanged}
            >
                <input
                    type="text"
                    placeholder="Find a Local Restaurant"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        marginTop: `27px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </SearchBox>
        )
    }
}

MapSearchBox.propTypes = {
    bounds: PropTypes.object,
    googleMapURL: PropTypes.string.isRequired,
    onPlacesChanged: PropTypes.func.isRequired,
    onSearchBoxMounted: PropTypes.func.isRequired
};

export default MapSearchBox;