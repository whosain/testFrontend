import axios from 'axios'

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

const URL = 'https://test-api.seucom.com'

export const listLocationTypes = () => async (dispatch) => {

    try {
        dispatch({ type: LOCATION_LIST_REQUEST })

        const { data } = await axios
            .get(`${URL}/api/locations/type`)

        dispatch({
            type: LOCATION_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOCATION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listProjects = () => async (dispatch) => {

    try {
        dispatch({ type: PROJECT_LIST_REQUEST })

        const { data } = await axios
            .get(`${URL}/api/locations/project`)

        dispatch({
            type: PROJECT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PROJECT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listBuildings = (locCode) => async (dispatch) => {

    try {
        dispatch({ type: BUILDING_LIST_REQUEST })

        const { data } = await axios
            .get(`${URL}/api/locations/building/${locCode}`)

        dispatch({
            type: BUILDING_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BUILDING_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listFloors = (buildCode) => async (dispatch) => {

    try {
        dispatch({ type: FLOOR_LIST_REQUEST })

        const { data } = await axios
            .get(`${URL}/api/locations/floor/${buildCode}`)

        dispatch({
            type: FLOOR_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FLOOR_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createLocation = (objData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_NEW_LOCATION_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }


        const { data } = await axios.post(
            `${URL}/api/locations`,
            objData,
            config
        )


        dispatch({
            type: CREATE_NEW_LOCATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_NEW_LOCATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const listLocations = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_LOCATION_REQUEST })

        const { data } = await axios
            .get(`${URL}/api/locations`)

        dispatch({
            type: ALL_LOCATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_LOCATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const editLocation = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_EDIT_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }


        const { data } = await axios.put(
            `${URL}/api/locations/${id}`,
            config
        )


        dispatch({
            type: POST_EDIT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getLocationById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_BY_ID_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }


        const { data } = await axios.get(
            `${URL}/api/locations/${id}`,
            config
        )


        dispatch({
            type: GET_BY_ID_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_BY_ID_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}