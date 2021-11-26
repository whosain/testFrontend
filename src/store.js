import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    locationListReducer, projectListReducer, buildingListReducer, floorListReducer, locationCreateReducer
} from './reducers/locationReducers'


const reducer = combineReducers({
    locationList: locationListReducer,
    projectList: projectListReducer,
    buildingList:buildingListReducer,
    floorList: floorListReducer,
    locationCreate: locationCreateReducer
})


const middleware = [thunk]

const store = createStore(reducer, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store