import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ComfirmToken from "./pages/Comfirm-Token"
import Navigation from './pages/Navigation'
import Settings from "./pages/Settings"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/auth/sign-up" element={<Register />} />
        <Route path="/api/auth/comfirm-token" element={<ComfirmToken />} />
        <Route path="/api/dashboard" element={<Dashboard />} />
        <Route path="/api/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}

export default App
