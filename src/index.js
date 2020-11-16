import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './redux/imagesReducer';
import modalReducer from './redux/modalReducer';

export const store = configureStore({
  reducer: {images:imagesReducer, modal:modalReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


reportWebVitals();
