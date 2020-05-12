import { ArModel, ALL_MODELS_LOADED, DELETE_MODELS, ModelsActionTypes, ArScenarioProject, ALL_SCENARIO_PROJECTS_LIST_LOADED, DELETE_SCENARIO_PROJECTS, SET_CURRENT_PROJECT } from "./types";

export function allModelsLoaded(models: ArModel[]): ModelsActionTypes {
    return {
        type: ALL_MODELS_LOADED,
        payload: models
    };
}

export function deleteAllModelsAction(): ModelsActionTypes {
    return {
        type: DELETE_MODELS,
    };
}

export function allScenarioProjectsLoaded(projects: ArScenarioProject[]): ModelsActionTypes {
    return {
        type: ALL_SCENARIO_PROJECTS_LIST_LOADED,
        payload: projects
    };
}

export function deleteAllScenarioProjects(): ModelsActionTypes {
    return {
        type: DELETE_SCENARIO_PROJECTS,
    };
}

export function setCurrentProject(project: ArScenarioProject): ModelsActionTypes {
    return {
        type: SET_CURRENT_PROJECT,
        payload: project
    };
}
