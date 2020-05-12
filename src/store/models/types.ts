export interface ArModelFile {
    id: number
    metadata: string;
    fileName: string;
}

export interface ArModel {
    id: number
    userId: number
    name: string;
    category: string;
    description: string;
    originalFile: ArModelFile;
    hiLodFile: ArModelFile;
    midLodFile: ArModelFile;
    lowLodFile: ArModelFile;
    multiLodFile: ArModelFile;
    thumbnail: string;
}

export interface ArScenarioProject {
    id: number;
    userId: number;
    name: string;
    description: string;
    fileName: string;
    steps: Array<ArProjectStep>;
    arModels: ArModel[];
}

export interface ArProjectStep {
    substeps: Array<ArProjectSubstep>;
    name: string;
    description: string;
}

export interface ArProjectSubstep {
    actions: Array<SubstepAction>;
    name: string;
    duration: number;
    description: string;
}

export interface SubstepAction {
    nodeIds: Array<number>;
    actionType: string;
    transform: ActionTransform;
    transitionParams: Map<string, string>;
    effects: Array<ActionEffect>;
}

export interface ActionTransform {
}

export class ActionEffect {
    type: string = "";
    actionParams: Map<string, string> = new Map<string, string>();
}

export const defaultArScenarioProject: ArScenarioProject = {
    id: 0,
    userId: 0,
    arModels: [],
    description: "",
    fileName: "",
    name: "",
    steps: [],
}

export interface ModelsState {
    storeModels: ArModel[];
    storeScenarioProjects: ArScenarioProject[];
    storeCurrentProject: ArScenarioProject;
}

// Describing the different ACTION NAMES available
export const ALL_MODELS_LOADED = "ALL_MODELS_LOADED";
export const DELETE_MODELS = "DELETE_MODELS";
export const ALL_SCENARIO_PROJECTS_LIST_LOADED = "ALL_SCENARIO_PROJECTS_LIST_LOADED";
export const DELETE_SCENARIO_PROJECTS = "DELETE_SCENARIO_PROJECTS";
export const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";

interface SetCurrentProjectAction {
    type: typeof SET_CURRENT_PROJECT
    payload: ArScenarioProject
}

interface AllModelsLoadedAction {
    type: typeof ALL_MODELS_LOADED
    payload: ArModel[]
}

interface DeleteModelsAction {
    type: typeof DELETE_MODELS
}

interface AllScenarioProjectsListLoadedAction {
    type: typeof ALL_SCENARIO_PROJECTS_LIST_LOADED
    payload: ArScenarioProject[]
}

interface DeleteScenarioProjectsAction {
    type: typeof DELETE_SCENARIO_PROJECTS
}

export type ModelsActionTypes = AllModelsLoadedAction | DeleteModelsAction | AllScenarioProjectsListLoadedAction | DeleteScenarioProjectsAction | SetCurrentProjectAction;
