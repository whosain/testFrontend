import {
    LOCATION_LIST_REQUEST,
    LOCATION_LIST_SUCCESS,
    LOCATION_LIST_FAIL,
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS,
    PROJECT_LIST_FAIL,
    BUILDING_LIST_REQUEST,
    BUILDING_LIST_SUCCESS,
    BUILDING_LIST_FAIL,
    FLOOR_LIST_REQUEST,
    FLOOR_LIST_SUCCESS,
    FLOOR_LIST_FAIL,
    CREATE_NEW_LOCATION_REQUEST,
    CREATE_NEW_LOCATION_SUCCESS,
    CREATE_NEW_LOCATION_FAIL
} from '../constants/locationContants'

export const locationListReducer = (state = { locations: [] }, action) => {
    switch (action.type) {
        case LOCATION_LIST_REQUEST:
            return { loading: true, locations: [] }
        case LOCATION_LIST_SUCCESS:

            let data = []
            let objLocations = action.payload.data
            if (objLocations) {

                for (const key in objLocations) {
                    if (Object.hasOwnProperty.call(objLocations, key)) {
                       data.push({code:key, name :objLocations[key]});
                    }
                }
            }

            return {
                loading: false,
                locations: data
            }
        case LOCATION_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const projectListReducer = (state = { projects: [] }, action) => {
    switch (action.type) {
        case PROJECT_LIST_REQUEST:
            return { loading: true, projects: [] }
        case PROJECT_LIST_SUCCESS:


            return {
                loading: false,
                projects: action.payload.data
            }
        case PROJECT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const buildingListReducer = (state = { buildings: [] }, action) => {
    switch (action.type) {
        case BUILDING_LIST_REQUEST:
            return { loading: true, buildings: [] }
        case BUILDING_LIST_SUCCESS:
            return {
                loading: false,
                buildings: action.payload.data
            }
        case BUILDING_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const floorListReducer = (state = { floors: [] }, action) => {
    switch (action.type) {
        case FLOOR_LIST_REQUEST:
            return { loading: true, floors: [] }
        case FLOOR_LIST_SUCCESS:
            return {
                loading: false,
                floors: action.payload.data
            }
        case FLOOR_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const locationCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_NEW_LOCATION_REQUEST:
            return { loading: true }
        case CREATE_NEW_LOCATION_SUCCESS:
            return { loading: false, success: true, newLocation: action.payload }
        case CREATE_NEW_LOCATION_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}