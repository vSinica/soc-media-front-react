
const initialState = {
    friends: ''
};

export const friendsReducer = (state = initialState, action) => {
    switch(action.type){
        case "REPLACE_FRIENDS":
            return {
                friends: action.friends
            }
        default: {
            return state;
        }
    }
}

export const replaceFriends = (friends) => ({ type: "REPLACE_FRIENDS", friends: friends });
