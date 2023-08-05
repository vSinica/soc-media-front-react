import React from 'react';
import classes from "./UserHeader.module.css"

const UserHeader = (props) => {
    return (
        <div className={classes.userheader}>

            <div className={classes.userdiv}>
                <div className={classes.square}></div>
                <div>{props.currentUser.userName}</div>
                <div>{props.currentUser.lastName}</div>
                {props.isHimOwnPage ?
                <div>(its you)</div>
                : null
                }
            </div>

        </div>

    );
};

export default UserHeader;