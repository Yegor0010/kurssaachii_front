export const USER_LOGGER_IN = 'user logged in';

export function saveUser(userId: string, userType: string) {
    return {
        type: USER_LOGGER_IN,
        payload: {userId, userType}
    };
}
