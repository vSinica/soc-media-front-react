import classes from "./FreindList.module.css";
import { useSelector } from 'react-redux';

const FreindList = (props) => {

    const friends = useSelector(state => state.friendsReducer.friends);

    return (
        <div className={classes.freindlistdiv}>
            <h3>friend list</h3>
            <div>
                {friends?.map((f) =>
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