import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const Home = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
      fetch(config.apiURL + '\\admins')
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
          <ul>
              {users.map(user => (
              <li>
                  <Link to={`user/${user.id}`}>{user.email}</Link>
              </li>
              ))}
          </ul>
      );
  }
}

export default Home;
