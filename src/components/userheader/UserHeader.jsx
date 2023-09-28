import React from 'react';
import classes from "./UserHeader.module.css"
import { useSelector } from 'react-redux';

const UserHeader = (props) => {

    const currentPageUser = useSelector(state => state.currentPageUserReducer.currentPageUser);

    return (
        <div className={classes.userheader}>

            <div className={classes.userdiv}>
                <div className={classes.square}></div>
                <div>{currentPageUser.userName}</div>
                <div>{currentPageUser.lastName}</div>
                {props.isHimOwnPage ?
                <div>(its you)</div>
                : null
                }
            </div>

        </div>

    );
};

export default UserHeader;