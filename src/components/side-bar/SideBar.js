import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ListGroup} from "react-bootstrap";
import CloseButton from "react-bootstrap/es/CloseButton";
import {deleteLocation} from "../../actions/listActions";

const SideBar = (props) => {
    const returnList = (locationList) => {
        return locationList.map((item, key) => (
                <ListGroup.Item key={`list-${(key + 1)}`} className="liked-location">
                    <div className="row">
                        <div className="col-2">
                            <i className="saved-heart fas fa-heart"> </i>
                        </div>
                        <div className="col-9">
                            <p className="liked-name">{item.name}</p>
                        </div>
                        <div className="col-1">
                            <CloseButton variant="danger" onClick={() => props.deleteLocation(item)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 offset-2">
                            <p className="saved-address">{item.address}</p>
                        </div>
                    </div>
                </ListGroup.Item>
            )
        )
    };

    return (
        <div>
            <div className="text-center">
                <h1>Saved Places</h1>
            </div>
            <ListGroup>
                {(props.locations.length === 0) ?
                    <ListGroup.Item className="text-center">No saved places yet!</ListGroup.Item>
                    : returnList(props.locations)}
            </ListGroup>
        </div>
    )
};

SideBar.propTypes = {
    locations: PropTypes.array,
    deleteLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return state.locations
};
const mapDispatchToProps = {
    deleteLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);