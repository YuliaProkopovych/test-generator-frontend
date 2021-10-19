import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <html lang="uk-UA">
        <head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </head>
        <body>
        <React.StrictMode>
          <App />
        </React.StrictMode>
        </body>
      </html>,
  document.getElementById('root'),
);
