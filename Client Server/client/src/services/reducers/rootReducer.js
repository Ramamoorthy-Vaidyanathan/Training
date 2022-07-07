export const initialState = {
    loginCredentials: {
        username: "",
        password: ""
    }
}

export const mainReducer = (state=initialState, action) => {
    switch(action.type){
        case "SAVE_CREDENTIALS":
            return { ...state, loginCredentials: action.payload }
        case "REMOVE_CREDENTIALS":
            return initialState
        default:
            return state
    }
}