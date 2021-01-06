import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
export default function PrivateRoute({ component: Component }) {
  const [isAuth, setAuth] = useState([
    {
      _id: '',
      isAuth: false,
      email: '',
      name: '',
    },
  ]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3002/user/auth');
      console.log(result);
      console.log('whats result data', result.data);
      setAuth(result.data);
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  console.log('isAuth', isAuth);
  return (
    <Route
      render={(props) =>
        isAuth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}
