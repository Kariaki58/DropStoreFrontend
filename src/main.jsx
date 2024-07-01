import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import createStore from 'react-auth-kit/createStore';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import { SessionAuthProvider } from './session/authentication/sessionAuth.jsx';
import { store } from './store/index.js';
import { Provider } from 'react-redux';

const authStore = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SessionAuthProvider>
            <AuthProvider store={authStore}>
              <App />
            </AuthProvider>
          </SessionAuthProvider>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
);
