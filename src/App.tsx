import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Users from './pages/Users'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/users' element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
