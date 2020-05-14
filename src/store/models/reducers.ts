import { USER_LOGGER_IN } from "./actions";
import { IUser } from "./types";

const initialState: IUser = {
    userType: '',
    userId: '',
};

export function modelsReducer(
    state: IUser = initialState,
    action: any
): IUser {
    console.log("action.type", action)
    switch (action.type) {
        case USER_LOGGER_IN:
            return {
                ...state,
                userType: action.payload.userType,
                userId: action.payload.userId,
            }
        default:
            return state;
    }
}
