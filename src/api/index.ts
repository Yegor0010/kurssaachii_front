import axios from 'axios';

const baseUrl = 'http://localhost:3001';

class BackendApi {

    static requestHeaders() {
        return {
            'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`,
            'Content-type': 'application/json',
        }
    }

    static async getStaffPositions() {
        try {
            const result = await axios.get(baseUrl + '/login');
            return result.data.recordset;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }

    static async login(body: any) {
        try {
            const result = await axios.post(baseUrl + '/login', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
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

}

export default BackendApi;
