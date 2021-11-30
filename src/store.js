import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    locationTypeReducer,
    projectListReducer,
    buildingListReducer,
    floorListReducer,
    locationCreateReducer,
    locationListReducer,
    locationEditReducer,
    locationByIdReducer
} from './reducers/locationReducers'


const reducer = combineReducers({
    locationType: locationTypeReducer,
    projectList: projectListReducer,
    buildingList: buildingListReducer,
    floorList: floorListReducer,
    locationCreate: locationCreateReducer,
    locationList: locationListReducer,
    locationEdit: locationEditReducer,
    locationById: locationByIdReducer
})


const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store