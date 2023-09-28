
const initialState = {
    currentPageUser: ''
};

export const currentPageUserReducer = (state = initialState, action) => {
    switch(action.type){
        case "REPLACE_CURRENT_PAGE_USER":
            return {
                currentPageUser: action.currentPageUser
            }
        default: {
            return state;
        }
    }

}

export const replaceCurrentPageUser = (user) => ({ type: "REPLACE_CURRENT_PAGE_USER", currentPageUser: user });