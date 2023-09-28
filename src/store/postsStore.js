
const initialState = {
    posts: ''
};

export const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case "REPLACE_POSTS":
            return {
                posts: action.posts
            }
        case "ADD_POST":
            return {
                ...state,
                posts: action.post
            }
        default: {
            return state;
        }
    }

}

export const replacePosts = (posts) => ({ type: "REPLACE_POSTS", posts: posts });
