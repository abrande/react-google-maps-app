export default (state = {locations: []}, action) => {
    switch (action.type) {
        case 'ADD_LOCATION':
            return {
                ...state,
                locations: state.locations.concat(action.locations)
            };
        case 'DELETE_LOCATION':
            return {
                ...state,
                locations: state.locations.filter(place => {
                    return place !== action.locations
                })
            };
        default:
            return state;
    }
};