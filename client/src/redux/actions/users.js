export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export const removeUser = (token) => {
    return {
        type: 'REMOVE_USER',
        token
    }
} 