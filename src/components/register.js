import React, { useState }  from 'react';
import config from '../config';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username, email: email, password: password })
    };
    fetch(config.apiURL + '/Users/register', requestOptions);
  }

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  const changeUsername = (event) => {
    setUsername(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>
          Username:
          <input type="text" name="username" onChange={changeUsername} />
        </label>
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

export default Register;
