import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ComfirmToken from "./pages/Comfirm-Token"
import Navigation from './pages/Navigation'
import Settings from "./pages/Settings"
import Dashboard from "./pages/Dashboard"
import CustomizedStore from "./pages/CustomizedStore"
import Orders from "./pages/Orders"
import Stats from "./pages/Stats"
import Store from './pages/Store'
import Carts from "./pages/Carts"
import ProductsInStore from "./pages/ProductsInStore"
import UploadProductForm from './pages/UploadProductForm';

function App() {
  return (
    <div className="">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/auth/sign-up" element={<Register />} />
        <Route path="/api/auth/comfirm-token" element={<ComfirmToken />} />
        <Route path="/api/settings" element={<Settings />} />
        <Route path="/api/store" element={<Store />} />
        <Route path="/api/carts" element={<Carts />} />
        <Route path="/api/dashboard" element={<Dashboard />} >
          <Route index element={<Stats />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/api/customize/store" element={<CustomizedStore />}>
          <Route index element={<ProductsInStore />} />
          <Route path="upload" element={<UploadProductForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
