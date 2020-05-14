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
    static async getRoomsTypes(body: any) {
        try {
            const result = await axios.post(baseUrl + '/rooms-types', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }
    static async updateRoom(body: any) {
        try {
            const result = await axios.post(baseUrl + '/rooms-update', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }
    static async getAllRooms(body: any) {
        try {
            const result = await axios.post(baseUrl + '/rooms-all', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }
    static async getAvailableRooms(body: any) {
        try {
            const result = await axios.post(baseUrl + '/rooms', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }
    static async postBooking(body: any) {
        try {
            const result = await axios.post(baseUrl + '/bookings', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }
    static async getBookings(body: any) {
        try {
            const result = await axios.post(baseUrl + '/bookings-view', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }
    static async getRoomsStates(body: any) {
        try {
            const result = await axios.get(baseUrl + '/states', body);
            return result.data;
        } catch (error) {
            console.log("BackendApi -> getStaffPositions -> error", error)
        }
    }

}

export default BackendApi;
