export function addLocation(locations) {
    return {
        type: 'ADD_LOCATION',
        locations: locations
    }
}

export function deleteLocation(locations) {
    return {
        type: 'DELETE_LOCATION',
        locations: locations
    }
}

