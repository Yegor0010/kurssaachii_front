import { Action } from 'redux'
import { allModelsLoaded, allScenarioProjectsLoaded } from './store/models/actions'
import { RootState } from './store'
import { ThunkAction } from 'redux-thunk'
import BackendApi, { GetAllModelsResponse, GetAllScenarioProjectsResponse } from './api'

export const thunkGetAllModels = (
    modelType: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    const asyncResp = await BackendApi.getModelsRequest(modelType) as GetAllModelsResponse;
    console.log(asyncResp);
    dispatch(
        allModelsLoaded(asyncResp.data)
    )
}

export const thunkGetAllScenarioProjects = (    
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    const asyncResp = await BackendApi.getAllScenarioProjectRequest() as GetAllScenarioProjectsResponse;
    console.log(asyncResp);
    dispatch(
        allScenarioProjectsLoaded(asyncResp.data)
    )
}
