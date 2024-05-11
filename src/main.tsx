import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.tsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="261331901458-f36ibbd72r43i6hb7his5g4t9vvc3pp0.apps.googleusercontent.com">
    <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Toaster position='top-right'/>
          <App />
        </BrowserRouter>
      </PersistGate>

    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
  ,
)
