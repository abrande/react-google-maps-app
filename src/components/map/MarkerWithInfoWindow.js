import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Marker, InfoWindow} from "react-google-maps";
import Button from "react-bootstrap/Button";
import {addLocation} from "../../actions/listActions";

class MarkerWithInfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            activeMarker: this.props.activeMarker,
            activeMarkerPosition: this.props.activeMarkerPosition
        };
        this.findDirections = this.findDirections.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeMarker: nextProps.activeMarker,
            activeMarkerPosition: nextProps.activeMarkerPosition
        })
    }

    handleToggleOpen = () => {
        this.setState({
            isOpen: true
        }, () => {
            if (this.state.isOpen) {
                this.setState({activeMarker: true}, () => {
                    this.props.closeOtherMarkers(this.props.id)
                })
            }
        })
    };

    handleToggleClose = () => {
        this.setState({isOpen: false})
    };

    findDirections = (activeMarkerPosition) => {
        this.props.getDirections(activeMarkerPosition);
    };

    saveLocation = (location) => {
        this.props.saveLocation(location)
    };

    render() {
        return (
            <Marker
                key={this.props.id}
                position={this.props.position}
                onClick={() => this.handleToggleOpen()}
            >
                {this.state.isOpen && this.state.activeMarker ?
                    <InfoWindow onClose={this.handleToggleClose}>
                        <div>
                            <div>
                                <p className="place-title">{this.props.name}</p>
                            </div>
                            <p>Rating: {this.props.rating}</p>
                            <p>{this.props.address}</p>
                            <Button size="sm" variant="info" className="directions" onClick={() => this.findDirections(this.props.position)}>
                                Directions <i className="fas fa-location-arrow" > </i>
                            </Button>
                            <Button size="sm" variant="light" className="heart" onClick={() => this.props.addLocation(this.props)}>
                                Save <i className="fas fa-heart" > </i>
                            </Button>
                        </div>
                    </InfoWindow> : null}
            </Marker>
        )
    }
}

MarkerWithInfoWindow.propTypes = {
    activeMarker: PropTypes.bool.isRequired,
    addLocation: PropTypes.func.isRequired,
    address: PropTypes.string,
    closeOtherMarkers: PropTypes.func.isRequired,
    getDirections: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    locations: PropTypes.objectOf(PropTypes.array),
    name: PropTypes.string,
    position: PropTypes.objectOf(PropTypes.func).isRequired,
    rating: PropTypes.number
};

const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = {
    addLocation
};


export default connect(mapStateToProps, mapDispatchToProps)(MarkerWithInfoWindow);