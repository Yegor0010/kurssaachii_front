import { Action } from 'redux'
import { USER_LOGGER_IN } from './store/models/actions'
import { RootState } from './store'
import { ThunkAction } from 'redux-thunk'
import BackendApi from './api'

// export const thunkGetAllModels = (
//     modelType: string
// ): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
//     const asyncResp = await BackendApi.getModelsRequest(modelType) as GetAllModelsResponse;
//     console.log(asyncResp);
//     dispatch(
//         allModelsLoaded(asyncResp.data)
//     )
// }
