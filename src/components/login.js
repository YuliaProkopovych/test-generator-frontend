import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import config from '../config';

const Login = ({ setToken }) =>
{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };
    fetch(config.apiURL + '/admins/login', requestOptions)
      .then(response => response.json())
      .then(data => setToken(data.token));
  }

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" onChange={changeEmail} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={changePassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;
