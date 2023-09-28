import './App.css';
import FreindList from "./components/freind/FreindList";
import PostList from "./components/post/PostList";
import UserHeader from "./components/userheader/UserHeader"
import axios from 'axios';
import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {addToken} from './store/tokenStore';
import {replacePosts} from './store/postsStore';
import {replaceCurrentPageUser} from './store/currentPageUserStore';
import {replaceFriends} from './store/friendStore';

function App() {

    const BASE_URL = 'http://localhost:8080';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [currentUser, setCurrentUser] = useState();
    const [fetchedCount, setFetchedCount] = useState(0);

    const token = useSelector(state => state.tokenReducer.token);
    const currentPageUser = useSelector(state => state.currentPageUserReducer.currentPageUser);
    const dispatch = useDispatch();


    function fetchPosts(userId) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        };
        axios.get(`${BASE_URL}/api/users/`+userId+`/posts`, { headers })
            .then(response => {
                dispatch(replacePosts(response.data));
                setFetchedCount((prev) => prev + 1);
            })
            .catch(error => {
                console.error(error);
            });
    };
    
    function login() {
        axios.post(`${BASE_URL}/api/login`, {
            password: password,
            username: username
        })
            .then((response) => {
                dispatch(addToken(response.data))
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error(error);
            });
    };

    function fetchFriendList(userId) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        };
        axios.get(`${BASE_URL}/api/friend-requests/getFreindList/`+userId, { headers })
            .then(response => {
                dispatch(replaceFriends(response.data));
                setFetchedCount((prev) => prev + 1);
            })
            .catch(error => {
                console.error(error);
            });
    }

    async function fetchUser(userId = null) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        };
        if(userId==null){ userId='';}
        else { userId = "?userId="+userId; }

         const res = await axios.get(`${BASE_URL}/api/getCurrentUser${userId}`, {headers});
         setFetchedCount((prev) => prev + 1);
         return await res.data;
    }

    function loadUserPage(id) {
        const fetchData = async () => {
            const response = await fetchUser(id);
            await dispatch(replaceCurrentPageUser(response));
            console.log(currentPageUser);
        }
        fetchData();
        fetchFriendList(id);
        fetchPosts(id);
    }

    function putNewPost(title = '',text = '') {
        console.log("title  " + title);
        console.log("text  " + text);
        const postData = JSON.stringify({ 'title': title, 'text': text });
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        axios.put(`${BASE_URL}/api/posts`, postData, headers)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if(token !== '') {
            const fetchData = async () => {
                const response = await fetchUser();
                await dispatch(replaceCurrentPageUser(response));
                await setCurrentUser(response);

            }
            fetchData();
        }
    }, [token]);

    useEffect(() => {
        if(currentPageUser) {
            fetchFriendList(currentPageUser.id);
            fetchPosts(currentPageUser.id);
        }
    },[currentUser])


  return (
      <div>
          {isLoggedIn && fetchedCount>=3 ?
              (
                          <div className="App">
                              <UserHeader isHimOwnPage={JSON.stringify(currentUser) === JSON.stringify(currentPageUser)}/>
                              <FreindList loadFriendPage={loadUserPage} />
                              <PostList putNewPost={putNewPost}
                                        isHimOwnPage={JSON.stringify(currentUser) === JSON.stringify(currentPageUser)}/>
                          </div>
              )
              :
              (<div className="App">
                  <input
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      type="user"
                      />
                  <input
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                      type="password"
                  />
                  <button onClick={login}>login</button>
              </div>)
          }

      </div>
  );


}

export default App;
