import React, {useState, useEffect} from 'react';
import classes from "./FreindList.module.css";

const FreindList = (props) => {


    const [friendList, setFriendList] = useState(props.friends)

    useEffect(() => {
        setFriendList(props.friends);
    }, [props]);

    return (
        <div className={classes.freindlistdiv}>
            <h3>friend list</h3>
            <div>
                {friendList?.map((f) =>
                    <div key={f.id} className={classes.friend} onClick={() => props.loadFriendPage(f.id)}>
                        <div className={classes.square}></div>
                        <div> {f.userName} </div>
                        <div> {f.lastName} </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FreindList;