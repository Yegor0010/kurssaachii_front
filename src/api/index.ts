import { ArModel, ArScenarioProject } from "../store/models/types";

export type GetAllModelsResponse = {
    errors: string[],
    data: ArModel[],
}

export type GetAllScenarioProjectsResponse = {
    errors: string[],
    data: ArScenarioProject[],
}

export type CreateScenarioProjectResponse = {
    errors: string[],
    data: ArScenarioProject,
}

class BackendApi {

    static requestHeaders() {
        return {
            'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`,
            'Content-type': 'application/json',
        }
    }

    static getAllModelsRequest() {
        return this.getModelsRequest('');
    }

    static getModelsRequest<GetAllModelsResponse>(modelType: string): Promise<GetAllModelsResponse> {
        const headers = this.requestHeaders();
        const request = new Request(`/api/v1/models/${modelType}`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetAllModelsResponse>;
        });
    }

    static getAllScenarioProjectRequest<GetAllScenarioProjectsResponse>(): Promise<GetAllScenarioProjectsResponse> {
        const headers = this.requestHeaders();
        const request = new Request(`/api/v1/projects`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetAllScenarioProjectsResponse>;
        });
    }

    static createScenarioProject<CreateScenarioProjectResponse>(arScenarioProject: ArScenarioProject): Promise<CreateScenarioProjectResponse> {
        const headers = this.requestHeaders();
        const body = JSON.stringify(arScenarioProject);

        const request = new Request(`/api/v1/projects`, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        return fetch(request).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<CreateScenarioProjectResponse>;
        });
    }

}

export default BackendApi;
