export const USER_LOGGER_IN = 'user logged in';

export function saveUser(userType: string) {
    return {
        type: USER_LOGGER_IN,
        payload: userType
    };
}
