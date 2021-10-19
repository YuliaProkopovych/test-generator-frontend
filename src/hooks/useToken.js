import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    console.log('getting token from localstorage',tokenString);
    return tokenString
  };
  const [token, setToken] = useState(getToken());

  // console.log('token:', token);

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    console.log('setting token',userToken)
  };

  return {
    setToken: saveToken,
    token: getToken(),
  }

}
