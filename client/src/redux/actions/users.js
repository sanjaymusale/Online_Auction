export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export const removeUser = (user) => {
    return {
        type: 'REMOVE_USER',
        user
    }
} 