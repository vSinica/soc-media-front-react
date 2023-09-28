import React, { useState } from 'react';
import classes from "./PostList.module.css";
import { useSelector } from 'react-redux';



const PostList = (props) => {
    const [title, setTitle] = useState([]);
    const [text, setText] = useState([]);

    const posts = useSelector(state => state.postsReducer.posts);

    return (
        <div>
            <h3 className={classes.h3label}>Post list</h3>
            <div className={classes.postlist}>
                {posts?.map((f) =>
                    <div key={f.id} className={classes.post}>
                        <div className={classes.postTitle} > {f.title}  </div>
                        <div className={classes.postText} > {f.text} </div>
                    </div>
                )}
            </div>
            {props.isHimOwnPage ? (
                <div className={classes.postlist}>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Text"
                    />
                    <button onClick={() => props.putNewPost(title, text)}>Добавить пост</button>
                </div>)
                : null
            }
        </div>
    );
};

export default PostList;