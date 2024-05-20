import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ComfirmToken from "./pages/Comfirm-Token"
import Profile from "./pages/Profile"
import Navigation from './pages/Navigation'

function App() {
  return (
    <div className="">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/auth/sign-up" element={<Register />} />
        <Route path="/api/auth/comfirm-token" element={<ComfirmToken />} />
        <Route path="/api/user" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
