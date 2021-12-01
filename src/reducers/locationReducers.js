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
    CREATE_NEW_LOCATION_FAIL,
    ALL_LOCATION_REQUEST,
    ALL_LOCATION_SUCCESS,
    ALL_LOCATION_FAIL,
    POST_EDIT_REQUEST,
    POST_EDIT_SUCCESS,
    POST_EDIT_FAIL,
    GET_BY_ID_REQUEST,
    GET_BY_ID_SUCCESS,
    GET_BY_ID_FAIL
} from '../constants/locationContants'

export const locationTypeReducer = (state = { locationTypes: [] }, action) => {
    switch (action.type) {
        case LOCATION_LIST_REQUEST:
            return { loading: true, locationTypes: [] }
        case LOCATION_LIST_SUCCESS:

            let data = []
            let objLocations = action.payload.data
            if (objLocations) {

                for (const key in objLocations) {
                    if (Object.hasOwnProperty.call(objLocations, key)) {
                        data.push({ code: key, name: objLocations[key] });
                    }
                }
            }

            return {
                loading: false,
                locationTypes: data
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
        let data = action.payload.data
        console.log(data.length, '<<<<< project');

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


export const locationListReducer = (state = { locations: [] }, action) => {
    switch (action.type) {
        case ALL_LOCATION_REQUEST:
            return { loading: true, locations: [] }
        case ALL_LOCATION_SUCCESS:
            return {
                loading: false,
                locations: action.payload.data
            }
        case ALL_LOCATION_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const locationEditReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_EDIT_REQUEST:
            return { loading: true }
        case POST_EDIT_SUCCESS:
            return { loading: false, success: true, updateLocation: action.payload }
        case POST_EDIT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


const initialState = {
    locById: {
        locCode: '',
        locCreatedAt: '',
        locDispensation: '',
        locID: '',
        locLatitude: '',
        locLongitude: '',
        locName: '',
        locType: '',
        locTypeLabel: '',
        project:{
            locName:'' 
        },
        floor:{
            locName:'' 
        },
        building:{
            locName:'' 
        }
    }
}

export const locationByIdReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case GET_BY_ID_REQUEST:
            return { ...state, loading: true }
        case GET_BY_ID_SUCCESS:
            // let data = action.payload.data
            // console.log('ini data by id', data);
            return { ...state, loading: false, success: true, locById: action.payload.data }

        case GET_BY_ID_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return { ...state }
    }
}


