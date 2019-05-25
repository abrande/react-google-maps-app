import React from "react"
import LikedSection from "./side-bar/SideBar";
import MapContainer from "./map/MapContainer";

const App = () => {
    return (
        <div className="main container-fluid">
            <div className="map-section col-md-7">
                <MapContainer/>
            </div>
            <div className="col-md-5 liked-section">
                <LikedSection/>
            </div>
        </div>
    )
};

export default App;