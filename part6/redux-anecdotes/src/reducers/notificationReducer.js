const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'SHOW_NOTIFICATION':
        return action.data
    case 'CLEAR_NOTIFICATION':
        return null
    default:
        return state
    }
}

const showNotification = (notification) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: notification
    }
}

const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const setNotification = (notification, sec) => {
    window.clearTimeout(window.timeout)
    return async dispatch => {
        dispatch(showNotification(notification))

        window.timeout = setTimeout(() => {
            dispatch(clearNotification())
        }, sec * 1000)
    }
}

export default notificationReducer