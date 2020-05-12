import {
    ModelsState,    
    ALL_MODELS_LOADED,
    DELETE_MODELS,
    ModelsActionTypes,
    ALL_SCENARIO_PROJECTS_LIST_LOADED,
    DELETE_SCENARIO_PROJECTS,
    SET_CURRENT_PROJECT,
    defaultArScenarioProject
} from "./types";

const initialState: ModelsState = {
    storeModels: [],
    storeScenarioProjects: [],
    storeCurrentProject: defaultArScenarioProject,
};

export function modelsReducer(
    state = initialState,
    action: ModelsActionTypes
): ModelsState {
    switch (action.type) {
        case ALL_MODELS_LOADED:
            console.log(state);
            console.log(action);
            return {
                storeModels: action.payload,
                storeScenarioProjects: state.storeScenarioProjects,
                storeCurrentProject: state.storeCurrentProject,
            };
        case DELETE_MODELS:
            return {
                storeModels: [],
                storeScenarioProjects: state.storeScenarioProjects,
                storeCurrentProject: state.storeCurrentProject,
            };
        case ALL_SCENARIO_PROJECTS_LIST_LOADED:
            console.log(state);
            console.log(action);
            return {
                storeModels: state.storeModels,
                storeScenarioProjects: action.payload,
                storeCurrentProject: state.storeCurrentProject,
            };
        case DELETE_SCENARIO_PROJECTS:
            return {
                storeModels: state.storeModels,
                storeScenarioProjects: [],
                storeCurrentProject: state.storeCurrentProject,
            };
        case SET_CURRENT_PROJECT:
            return {
                storeModels: state.storeModels,
                storeScenarioProjects: state.storeScenarioProjects,
                storeCurrentProject: action.payload,
            };
        default:
            return state;
    }
}
