import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.tsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials=true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Header/>
      <App />
    </BrowserRouter>
    </Provider>
    

  </React.StrictMode>,
)
