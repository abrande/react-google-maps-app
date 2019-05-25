import {combineReducers} from "redux";
import locationListReducer from "./locationListReducer";

export default combineReducers({
    locations: locationListReducer
})