import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import useToken from '../hooks/useToken';

import Login from '../components/login'
import Register from '../components/register'
import CreateTest from './new-test';

const Home = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  const { token, setToken } = useToken();

  const unauthorizedUserComponent = <div><Login setToken={setToken}/><Register/></div>;

  useEffect(() => {
      fetch(config.apiURL + '\\users')
          .then(res => res.json())
          .then(
              (data) => {
                  setIsLoaded(true);
                  setUsers(data);

              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          )
    }, []); if (error) {
      return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
      return <div>Loading...</div>;
  } else {
      return (
        <div>
          <h1>Test Generator</h1>
          <h3>Simple way to create tests!</h3>
          <div class="search"></div>
          {token === null && unauthorizedUserComponent}
          <div class="popular">
            <p>Most popular</p>
              <ul>
                  {users.map(user => (
                  <li>
                      <Link to={`user/${user.id}`}>{user.email}</Link>
                  </li>
                  ))}
              </ul>
              <CreateTest/>
          </div>
        </div>
      );
  }
}

export default Home;
