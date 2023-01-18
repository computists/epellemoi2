import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
//import rootReducer from './reducers/rootReducer';
import postsSlice from './reducers/postsSlice';
import { UserProvider } from './contexts/user.context';

//const store = configureStore({reducer: postsSlice});
const store = configureStore(postsSlice);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        < UserProvider >
          <App />
        </UserProvider>
      </Provider>
    </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
