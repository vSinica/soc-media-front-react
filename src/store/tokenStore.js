
const initialState = {
    token: ''
};

export const tokenReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_TOKEN":
            return {
                ...state,
                token: action.token
            }
        default: {
            return state;
        }
    }

}

export const addToken = (token) => ({ type: "ADD_TOKEN", token: token });