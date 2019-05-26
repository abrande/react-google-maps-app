import React from "react"
import SideBar from "./side-bar/SideBar";
import MapContainer from "./map/MapContainer";

class App extends React.Component {
    render() {
        return (
            <div className="main container-fluid">
                <div className="map-section col-md-7 col-sm-7">
                    <MapContainer/>
                </div>
                <div className="col-md-5 col-sm-5 liked-section">
                    <SideBar/>
                </div>
            </div>
        )
    }
}

export default App;